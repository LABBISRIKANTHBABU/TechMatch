# Firestore Security Rules

## Overview
These rules protect your TechMatch Firestore database by ensuring:
- Users can only read/write their own documents
- Admins have broader access
- Authenticated users can create bookings
- Unauthorized access is blocked

## Implementation

### Step 1: Navigate to Firestore Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your TechMatch project
3. Go to **Firestore Database** → **Rules** tab

### Step 2: Replace Default Rules
Delete the default rules and paste these:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Allow authenticated users to access their own user document
    match /users/{userId} {
      // Users can only read their own document
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Users can create their own document (during signup)
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Users can only update their own document
      allow update: if request.auth != null && request.auth.uid == userId;
      
      // Never allow deletion from client (data retention policy)
      allow delete: if false;
    }

    // Bookings collection: secure user bookings and counselor records
    match /bookings/{bookingId} {
      // Create booking: any authenticated user
      allow create: if request.auth != null && 
                       request.resource.data.studentId == request.auth.uid;
      
      // Read: student can read their own bookings, counselor can read assigned bookings, admin can read all
      allow read: if request.auth != null && (
        resource.data.studentId == request.auth.uid ||
        resource.data.counsellorId == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      
      // Update: student can update own, counselor can update assigned, admin can update any
      allow update: if request.auth != null && (
        resource.data.studentId == request.auth.uid ||
        resource.data.counsellorId == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      
      // Delete: only admin
      allow delete: if request.auth != null && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Public listings (services, counselors, etc.) - readable by anyone
    match /services/{serviceId} {
      allow read: if true; // Public
      allow write: if false; // Admin only (use Cloud Functions)
    }

    match /counselors/{counselorId} {
      allow read: if true; // Public
      allow write: if false; // Admin only (use Cloud Functions)
    }

    // Deny everything else by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish Rules
Click **Publish** button to deploy the rules.

---

## Rule Explanations

### Users Collection
```firestore
match /users/{userId} {
  allow read: if request.auth != null && request.auth.uid == userId;
```
- User can only read their own profile
- `request.auth.uid` is the logged-in user's ID
- `userId` is the document ID in /users collection

### Bookings Collection - Create
```firestore
allow create: if request.auth != null && 
                 request.resource.data.studentId == request.auth.uid;
```
- Authenticated user can create booking
- Booking must have `studentId` matching their UID
- Prevents user from creating booking for someone else

### Bookings Collection - Read
```firestore
allow read: if request.auth != null && (
  resource.data.studentId == request.auth.uid ||
  resource.data.counsellorId == request.auth.uid ||
  get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
);
```
- Student can read own bookings
- Counselor can read assigned bookings
- Admin can read all bookings (checks role field in users collection)

---

## Testing Rules

### Test in Firebase Console

1. Go to Firestore **Rules** tab
2. Click **Rules Playground** (or test mode)
3. Simulate requests:

**Test Case 1: Unauthenticated user tries to read**
- Select `read` operation
- Path: `/users/any-uid`
- Auth: `Unauthenticated`
- Expected: ❌ Denied

**Test Case 2: User reads own profile**
- Select `read` operation
- Path: `/users/user-123`
- Auth: `Authenticated` with UID: `user-123`
- Expected: ✅ Allowed

**Test Case 3: User reads another's profile**
- Select `read` operation
- Path: `/users/user-456`
- Auth: `Authenticated` with UID: `user-123`
- Expected: ❌ Denied

### Test in Code

```javascript
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// This works (reading own document)
const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
console.log(userDoc.data());

// This fails with permission-denied error (reading another's document)
try {
  const otherUserDoc = await getDoc(doc(db, 'users', 'someone-else-uid'));
} catch (error) {
  console.log('Error:', error.code); // 'permission-denied'
}
```

---

## Setting Admin Role

To make a user an admin (required for advanced rules):

### Option A: Firebase Admin SDK (Backend)
```javascript
// Node.js backend (requires firebase-admin)
const admin = require('firebase-admin');

const uid = 'user-uid-here';
await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
```

### Option B: Manual Firestore Update
1. Go to Firestore Console
2. Find user document in `/users/{uid}`
3. Edit document, change `role` field to `admin`
4. Save

Note: Custom claims are cached. User must refresh token:
```javascript
const user = firebase.auth().currentUser;
await user.getIdTokenResult(true); // force refresh
```

---

## Production Checklist

- [ ] Rules reviewed by security team
- [ ] Test all user scenarios
- [ ] Verify admin-only operations work
- [ ] Confirm regular users cannot access admin sections
- [ ] Set up Firestore backup/restore
- [ ] Monitor Firestore usage/costs
- [ ] Set up alerts for suspicious activity
- [ ] Document all collections and their access patterns

---

## Common Issues

### Issue: "Permission denied" on user creation
**Cause:** Rule prevents user doc creation  
**Fix:** Ensure rule allows `create` with `request.auth != null && request.auth.uid == userId`

### Issue: Admin cannot read all bookings
**Cause:** Admin role not set in user document  
**Fix:** Set `role: 'admin'` in user's Firestore doc, have user refresh token

### Issue: Users can read other users' profiles
**Cause:** Read rule missing UID check  
**Fix:** Add `request.auth.uid == userId` condition

### Issue: "Invalid request to Cloud Firestore"
**Cause:** Collection name mismatch in rules vs code  
**Fix:** Ensure collection names match exactly (case-sensitive)

---

## Advanced: Custom Validation

### Validate booking has required fields
```firestore
match /bookings/{bookingId} {
  allow create: if request.auth != null && 
                   request.resource.data.keys().hasAll(['studentId', 'counsellorId', 'date']);
}
```

### Validate email format
```firestore
match /users/{userId} {
  allow create: if request.resource.data.email.matches('.*@.*\\..*');
}
```

### Limit booking dates to future only
```firestore
match /bookings/{bookingId} {
  allow create: if request.auth != null && 
                   request.resource.data.date > now;
}
```

---

## References

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/rules)
- [Security Rules Best Practices](https://firebase.google.com/docs/rules/rules-behavior)
- [Rules Playground Guide](https://firebase.google.com/docs/rules/rules-playground)

---

**Last Updated:** November 28, 2025  
**Status:** ✅ Ready for Implementation

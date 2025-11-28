# Production Auth Features - Quick Reference

## ✅ What's New & Improved

### 1. Enhanced firebase.js
```javascript
✅ signupWithEmail(email, password, displayName, options)
   - Accepts displayName (saves to profile)
   - Sends email verification (optional)
   - Stores role + TOS acceptance in Firestore
   - Validates password strength

✅ signInWithGoogle()
   - Auto-saves profile to Firestore
   - Optional email verification check
   - Handles Google OAuth tokens

✅ Phone OTP Flow
   - Recaptcha properly cached (no double-render)
   - Better error handling
   - Clears state after confirmation

✅ Helper Functions
   - getCurrentUser() - sync user check
   - signOutUser() - clean logout
   - onAuthChange() - reactive updates
   - saveUserToFirestore() - manual profile updates
```

### 2. Updated SignUp Component
```javascript
✅ displayName field (required)
✅ TOS checkbox (required)
✅ Email verification sent automatically
✅ Loading states on all buttons
✅ Success messages with auto-redirect
✅ Password validation (min 6 chars)
✅ Better error handling
✅ Improved OTP phone flow
```

### 3. Route Protection
```javascript
// Simple: RequireAuth wrapper
<Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />

// Better: AuthProvider + useAuth hook
<AuthProvider>
  <Router>
    <RequireAuth><Contact /></RequireAuth>
  </Router>
</AuthProvider>

// In any component:
const { user, loading } = useAuth();
```

### 4. Excel Export for Admins
```javascript
✅ Export all users to Excel
✅ Export only students (filtered)
✅ CSV export (no dependencies needed)
✅ Includes: UID, Email, Name, Phone, Role, TOS, Dates
✅ Admin-only access (should be behind permission check)

// Usage:
import { exportUsersToExcel, exportStudentsToExcel, exportUsersToCSV } from '../utils/exportUsers';

<button onClick={exportUsersToExcel}>Export Users</button>
<button onClick={exportStudentsToExcel}>Export Students</button>
<button onClick={exportUsersToCSV}>Export as CSV</button>
```

### 5. Firestore Security Rules
```javascript
✅ Users can only read/write own profile
✅ Admins can read all documents
✅ Bookings properly secured by studentId + counsellorId
✅ Public collections (services) readable by all
✅ Delete operations restricted (data retention)
```

### 6. Firestore User Document Structure
```javascript
{
  uid: "string",              // Firebase auth UID
  email: "string",            // Email address
  displayName: "string",      // ✅ NEW - from signup
  phoneNumber: "string",      // Phone (if OTP auth)
  photoURL: "string",         // Google profile pic
  role: "student|admin",      // ✅ NEW - role tracking
  acceptedTOS: boolean,       // ✅ NEW - consent tracking
  createdAt: "ISO-date",      // ✅ NEW - signup timestamp
  lastSeen: "ISO-date"        // ✅ NEW - last login
}
```

---

## 📋 Implementation Checklist

### Files to Use
- [x] `src/firebase.js` - Already updated ✅
- [x] `src/pages/SignUp.js` - Already updated ✅
- [x] `src/components/RequireAuth.jsx` - Created ✅
- [x] `src/context/AuthContext.js` - Created ✅
- [x] `src/utils/exportUsers.js` - Created ✅

### Documentation Files
- [x] `FIRESTORE_SECURITY_RULES.md` - Setup guide for rules
- [x] `PRODUCTION_AUTH_SETUP.md` - Complete setup guide
- [x] `PRODUCTION_AUTH_FEATURES_QUICK_REF.md` - This file

### Installation
```bash
# Install Excel export dependencies (optional)
npm install exceljs file-saver
```

### Setup Steps

1. **Firebase Configuration**
   ```env
   # .env.local
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   ```

2. **Enable Firebase Services**
   - Firebase Console → Authentication
   - Enable: Email/Password, Google OAuth, Phone (if needed)

3. **Deploy Firestore Rules**
   - Firebase Console → Firestore → Rules
   - Paste rules from `FIRESTORE_SECURITY_RULES.md`

4. **Test Authentication**
   - Sign up with email
   - Check verification email received
   - Sign in with Google
   - Verify profile saved to Firestore

5. **Test Protected Routes**
   - Navigate to `/contact` without auth
   - Should redirect to `/signin`
   - Sign in and return to `/contact`

6. **Test Excel Export** (Admin only)
   - Create admin user (set role='admin' in Firestore)
   - Click export button
   - Download and verify Excel file

---

## 🔐 Security Checklist

- [ ] Environment variables NOT committed to git
- [ ] Firestore rules deployed
- [ ] Email verification enabled
- [ ] Google OAuth credentials secure
- [ ] HTTPS enabled in production
- [ ] CORS configured correctly
- [ ] Admin role set up properly
- [ ] Backend validates all auth calls

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Install Excel export (optional)
npm install exceljs file-saver

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

---

## 📚 Function Reference

### Authentication Functions

```javascript
import {
  signInWithGoogle,
  signupWithEmail,
  signinWithEmail,
  signOutUser,
  sendPhoneOtp,
  confirmPhoneOtp,
  getCurrentUser,
  onAuthChange,
  saveUserToFirestore,
  setupRecaptcha
} from '../firebase';

// Sign up with email
await signupWithEmail(email, password, displayName, {
  requireEmailVerification: true,
  role: 'student',
  acceptedTOS: true
});

// Sign in with email
await signinWithEmail(email, password);

// Sign in with Google
await signInWithGoogle();

// Phone OTP flow
const confirmResult = await sendPhoneOtp(phone);
await confirmPhoneOtp(confirmResult, otpCode);

// Sign out
await signOutUser();

// Get current user (sync)
const user = getCurrentUser();

// Listen for changes (reactive)
onAuthChange((user) => {
  console.log('User changed:', user);
});

// Save to Firestore manually
await saveUserToFirestore(user, {
  role: 'admin',
  custom: { college: 'MIT' }
});
```

### React Hooks

```javascript
import { useAuth } from '../context/AuthContext';

// Use in any component
const { user, loading } = useAuth();

// Check specific user data
if (user?.role === 'admin') {
  // Show admin content
}

// Conditional rendering
if (loading) return <p>Loading...</p>;
if (!user) return <p>Sign in required</p>;
return <Dashboard />;
```

### Data Export Functions

```javascript
import { 
  exportUsersToExcel,
  exportStudentsToExcel,
  exportUsersToCSV 
} from '../utils/exportUsers';

// Export all users to Excel
await exportUsersToExcel();

// Export students only
await exportStudentsToExcel();

// Export as CSV (no dependencies)
await exportUsersToCSV();
```

---

## 🧪 Testing Scenarios

### Test 1: Email Signup Flow
1. Go to `/signup`
2. Fill form: name, email, password
3. Check TOS checkbox
4. Click "Create account"
5. ✅ Should see success message
6. ✅ Check email inbox for verification
7. ✅ Check Firestore has user doc

### Test 2: Google OAuth Flow
1. Go to `/signup`
2. Click "Continue with Google"
3. Select Google account
4. ✅ Should redirect to home
5. ✅ Check Firestore has user doc with Google data

### Test 3: Phone OTP Flow
1. Go to `/signup`
2. Click "Sign up with Phone"
3. Enter phone with country code: `+1234567890`
4. Click "Send OTP"
5. ✅ Should receive OTP code
6. Enter OTP and confirm
7. ✅ Should be signed in

### Test 4: Route Protection
1. Sign out
2. Try to go to `/contact`
3. ✅ Should redirect to `/signin`
4. Sign in
5. ✅ Should return to `/contact`

### Test 5: Excel Export
1. Set user role to 'admin' in Firestore
2. Create multiple test users
3. Click "Export Users"
4. ✅ Download Excel file with user data
5. ✅ Verify columns: UID, Email, Name, Phone, Role, etc.

---

## ⚠️ Common Mistakes

❌ **Don't:** Store passwords in Firestore  
✅ **Do:** Let Firebase handle password security

❌ **Don't:** Skip Firestore security rules  
✅ **Do:** Deploy rules before production

❌ **Don't:** Commit .env.local to git  
✅ **Do:** Add to .gitignore, use .env.example

❌ **Don't:** Allow unauthenticated access to user data  
✅ **Do:** Use RequireAuth wrapper on sensitive routes

❌ **Don't:** Export user data without admin check  
✅ **Do:** Guard export functions with role check

---

## 📞 Support

For issues:
1. Check error message in console
2. Verify Firebase credentials in `.env.local`
3. Check Firestore rules are deployed
4. Test in Firebase Console Rules Playground
5. Enable Firebase debug logging:
   ```javascript
   import { enableLogging } from 'firebase/app';
   enableLogging(true);
   ```

---

## 🔗 Useful Links

- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [React Router v6](https://reactrouter.com)
- [exceljs Documentation](https://github.com/exceljs/exceljs)

---

**Last Updated:** November 28, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

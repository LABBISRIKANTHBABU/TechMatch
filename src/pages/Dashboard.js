import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOutUser, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword, updateProfile as firebaseUpdateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Pages.css';
import '../styles/Dashboard.css';

/**
 * Dashboard - User profile page
 * Shows logged-in user's data loaded from Firestore
 * Accessible only to authenticated users
 */
function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: '',
    phoneNumber: '',
    photoURL: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    // If user not authenticated, redirect to signin
    if (!loading && !user) {
      navigate('/signin', { replace: true });
      return;
    }

    // Fetch full user data from Firestore
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        } else {
          // User doc doesn't exist yet (shouldn't happen if signup/signin worked)
          console.warn('User document not found in Firestore');
          setUserData({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'No name set',
            photoURL: user.photoURL,
          });
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [user, loading, navigate]);

  useEffect(() => {
    if (userData && !isEditing) {
      setEditData({
        displayName: userData.displayName || '',
        phoneNumber: userData.phoneNumber || '',
        photoURL: userData.photoURL || '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [userData, isEditing]);

  const handleSignOut = async () => {
    setSignOutLoading(true);
    try {
      await signOutUser();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Sign out failed:', err);
      alert('Failed to sign out: ' + err.message);
      setSignOutLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateEditForm = () => {
    const newErrors = {};
    if (editData.phoneNumber && !/^[+\d\-\s()]*$/.test(editData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }
    if (editData.newPassword && editData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (editData.newPassword && editData.newPassword !== editData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const newErrors = validateEditForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUpdateLoading(true);
    setUpdateMessage('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('User not authenticated');

      // Update display name in Firebase Auth
      if (editData.displayName !== userData.displayName) {
        await firebaseUpdateProfile(currentUser, { displayName: editData.displayName });
      }

      // Update user doc in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      const updatePayload = {};

      if (editData.displayName !== userData.displayName) updatePayload.displayName = editData.displayName;
      if (editData.phoneNumber !== userData.phoneNumber) updatePayload.phoneNumber = editData.phoneNumber;
      if (editData.photoURL !== userData.photoURL) updatePayload.photoURL = editData.photoURL;
      updatePayload.updatedAt = new Date().toISOString();

      if (Object.keys(updatePayload).length > 0) {
        await updateDoc(userDocRef, updatePayload);
      }

      // Update password if provided
      if (editData.newPassword) {
        await updatePassword(currentUser, editData.newPassword);
      }

      // Refresh user data
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      }

      setUpdateMessage('✓ Profile updated successfully!');
      setIsEditing(false);
      setEditData({
        displayName: editData.displayName,
        phoneNumber: editData.phoneNumber,
        photoURL: editData.photoURL,
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => setUpdateMessage(''), 3000);
    } catch (err) {
      console.error('Profile update failed:', err);
      setErrors({ submit: err.message });
    } finally {
      setUpdateLoading(false);
    }
  };

  // Loading state
  if (loading || loadingData) {
    return (
      <div className="page dashboard-page">
        <div className="container">
          <h1>Dashboard</h1>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="page dashboard-page">
        <div className="container">
          <h1>Access Denied</h1>
          <p>Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <div className="container">
        <h1>Welcome, {userData?.displayName || user.email}!</h1>

        <div className="dashboard-card">
          <h2>Your Profile</h2>
          
          {updateMessage && <div className="success-message">{updateMessage}</div>}
          {errors.submit && <div className="error-message-box">{errors.submit}</div>}

          {!isEditing ? (
            <>
              <div className="profile-section">
                {userData?.photoURL && (
                  <img
                    src={userData.photoURL}
                    alt={userData.displayName || 'Profile'}
                    className="profile-avatar"
                  />
                )}

                <div className="profile-info">
                  <div className="info-row">
                    <span className="label">Email:</span>
                    <span className="value">{userData?.email || 'N/A'}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Display Name:</span>
                    <span className="value">{userData?.displayName || 'Not set'}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Role:</span>
                    <span className="value">{userData?.role || 'user'}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Phone:</span>
                    <span className="value">{userData?.phoneNumber || 'Not set'}</span>
                  </div>

                  <div className="info-row">
                    <span className="label">Member Since:</span>
                    <span className="value">
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="actions">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleSignOut}
                  disabled={signOutLoading}
                >
                  {signOutLoading ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveProfile} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={editData.displayName}
                  onChange={handleEditChange}
                  className={errors.displayName ? 'error' : ''}
                />
                {errors.displayName && <span className="error-message">{errors.displayName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={handleEditChange}
                  placeholder="+1 (555) 000-0000"
                  className={errors.phoneNumber ? 'error' : ''}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="photoURL">Profile Picture URL</label>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  value={editData.photoURL}
                  onChange={handleEditChange}
                  placeholder="https://..."
                  className={errors.photoURL ? 'error' : ''}
                />
                {errors.photoURL && <span className="error-message">{errors.photoURL}</span>}
              </div>

              <div className="form-divider">Change Password (Optional)</div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={editData.newPassword}
                  onChange={handleEditChange}
                  placeholder="Leave blank to keep current password"
                  className={errors.newPassword ? 'error' : ''}
                />
                {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={editData.confirmPassword}
                  onChange={handleEditChange}
                  placeholder="Confirm new password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={updateLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

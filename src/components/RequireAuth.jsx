import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../firebase';

/**
 * RequireAuth Component
 * Protects routes that require authentication
 * Redirects unauthenticated users to /signin with return location
 * 
 * Basic usage (synchronous check - may not work on page reload):
 * <Route path="/protected" element={<RequireAuth><ProtectedPage /></RequireAuth>} />
 * 
 * For better reactivity with loading state, use AuthContext (see AdvancedAuthPatterns.js)
 */
export default function RequireAuth({ children }) {
  const location = useLocation();
  const user = getCurrentUser(); // synchronous, might be null on reload

  // User not authenticated - redirect to signin with return location
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // User authenticated - render protected content
  return children;
}

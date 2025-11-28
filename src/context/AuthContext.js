import React, { createContext, useEffect, useState, useContext } from 'react';
import { onAuthChange } from '../firebase';

/**
 * AuthContext
 * Provides reactive Firebase authentication state to entire app
 * Uses onAuthStateChanged for real-time updates
 * 
 * Recommended: Use this instead of RequireAuth alone for better loading states
 */
const AuthContext = createContext({ user: null, loading: true });

/**
 * AuthProvider Component
 * Wraps app and manages Firebase auth state
 * Handles loading state during initial auth check
 */
export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(() => {
    // Subscribe to Firebase auth changes
    const unsubscribe = onAuthChange((user) => {
      setState({ user, loading: false });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * Use this hook in any component to access auth state
 * Returns { user, loading }
 * 
 * Example:
 * const { user, loading } = useAuth();
 * if (loading) return <p>Loading auth...</p>;
 * if (!user) return <p>Not signed in</p>;
 * return <p>Welcome {user.email}</p>;
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

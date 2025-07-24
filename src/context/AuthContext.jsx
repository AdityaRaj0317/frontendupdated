// src/context/AuthContext.jsx - CORRECTED
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom'; // <-- REMOVE THIS LINE

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // <-- REMOVE THIS LINE

  // Effect to load user and token from localStorage on initial component mount
  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log("AuthContext: User loaded from localStorage:", parsedUser);
        } else {
          // If either token or user is missing, clear both to ensure a clean state
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          console.log("AuthContext: No valid session found in localStorage or partial data. Cleared.");
        }
      } catch (error) {
        console.error("AuthContext: Failed to load user from localStorage, clearing data:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromLocalStorage();
  }, []); // Empty dependency array means this runs only once on mount

  // Effect to persist user to localStorage whenever `user` state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Assuming 'token' is set during login and not cleared here automatically
      // if (user.token) { // Only if user object contains the token
      //   localStorage.setItem('token', user.token);
      // }
      console.log("AuthContext: User state persisted to localStorage:", user);
    } else {
      // Only remove 'user' here. 'token' should be removed in logout for consistency,
      // or during initial load if token is missing.
      localStorage.removeItem('user');
      // localStorage.removeItem('token'); // Removed this here, handle in logout
      console.log("AuthContext: User state cleared from localStorage.");
    }
  }, [user]); // Re-run when 'user' state changes

  // Logout function - only manages authentication state, no navigation
  const logout = () => {
    console.log("AuthContext: Logging out user and clearing state.");
    setUser(null); // This triggers the useEffect above to clear 'user' from localStorage
    localStorage.removeItem('token'); // Explicitly remove token here
  };

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const authContextValue = useMemo(() => ({
    user,
    setUser, // Keep setUser if you need it for external updates (e.g., profile edits)
    logout,
    loading
  }), [user, loading]); // logout is a stable function, no need to include in dependency array

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
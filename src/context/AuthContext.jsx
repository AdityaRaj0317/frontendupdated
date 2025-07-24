import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Get the navigate function here

  // Effect to load user from localStorage on initial component mount
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
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          console.log("AuthContext: No valid session found in localStorage.");
        }
      } catch (error) {
        console.error("AuthContext: Failed to load user from localStorage:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromLocalStorage();
  }, []);

  // Effect to persist user to localStorage whenever `user` state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log("AuthContext: User state persisted to localStorage:", user);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      console.log("AuthContext: User state cleared from localStorage.");
    }
  }, [user]);

  // Logout function - now performs the redirect
  const logout = () => {
    setUser(null); // This clears local storage via the useEffect above
    navigate('/login'); // Redirect to login page immediately after logout
    console.log("AuthContext: User logged out and redirected to /login.");
  };

  // Memoize the context value
  const authContextValue = useMemo(() => ({
    user,
    setUser,
    logout, // Now this logout function also handles navigation
    loading
  }), [user, setUser, logout, loading]); // Added logout to dependency array

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
// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Function to set isAdmin after login
  const login = (isAdminFlag) => {
    setIsAdmin(isAdminFlag);
    localStorage.setItem('isAdmin', isAdminFlag);
  };

  // Function to clear isAdmin after logout
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // Check if user is admin on mount
  useEffect(() => {
    const isAdminStored = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminStored === 'true');
  }, []);

  const values = {
    isAdmin,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

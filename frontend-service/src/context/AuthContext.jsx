import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create a Provider component
export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null);

  // On mount, sync with localStorage if the user was previously logged in
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  // Helper function for login
  const login = (email) => {
    localStorage.setItem('userEmail', email);
    setUserEmail(email);
  };

  // Helper function for logout
  const logout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
  };

  // 3. Provide the state and updater functions to children
  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

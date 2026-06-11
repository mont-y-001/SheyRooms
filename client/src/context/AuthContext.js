import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Return a fallback so components don't crash outside provider
    return { user: null, loading: false, logout: () => {} };
  }
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read once on mount
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const setAuthUser = useCallback((profile) => {
    setUser(profile);
  }, []);

  const value = React.useMemo(() => ({ user, loading, logout, setAuthUser }), [user, loading, logout, setAuthUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
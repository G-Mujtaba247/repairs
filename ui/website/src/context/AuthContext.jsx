import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Auth context – single source of truth for the logged-in user.
 *
 * Stored shape in localStorage:
 *   key "token"  → JWT string
 *   key "user"   → JSON-stringified user object { _id, name, email, role, … }
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false); // true once we've hydrated from storage

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser  = localStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // corrupted storage — clear it
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setReady(true);
    }
  }, []);

  const login = useCallback((newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const isLoggedIn   = Boolean(token && user);
  const isTechnician = isLoggedIn && user?.role === 'technician';
  const isCustomer   = isLoggedIn && user?.role === 'customer';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoggedIn, isTechnician, isCustomer, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthProvider;

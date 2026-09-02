import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  CSUITE: 'csuite',
  OPERATOR: 'operator',
  ADMIN: 'admin'
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ role: 'csuite', name: 'Administrador OT' });

  const login = (role = 'csuite') => {
    setUser({ role, name: 'Administrador OT' });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const hasPermission = () => true;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, switchRole, hasPermission, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      isAuthenticated: true,
      user: { role: 'csuite' },
      login: () => {},
      logout: () => {},
      switchRole: () => {},
      hasPermission: () => true,
      ROLES
    };
  }
  return context;
};
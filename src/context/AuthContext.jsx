import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const ROLES = {
  CSUITE: 'csuite',
  OPERATOR: 'operator',
  ADMIN: 'admin',
  SUPERINTENDENTE: 'superintendente'
};

export const ROLE_DETAILS = {
  csuite: { label: 'C-Suite & Directiva', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  operator: { label: 'Operador SCADA / OT', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  admin: { label: 'Administrador OT', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  superintendente: { label: 'Superintendencia Mina', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('indusync_auth');
    return savedAuth !== null ? JSON.parse(savedAuth) : true;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('indusync_user');
    return savedUser ? JSON.parse(savedUser) : { role: ROLES.CSUITE, name: 'Roberto Portales', email: 'roberto@indusync.cl' };
  });

  useEffect(() => {
    localStorage.setItem('indusync_user', JSON.stringify(user));
    localStorage.setItem('indusync_auth', JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  const login = (role = ROLES.CSUITE) => {
    setUser({ role, name: 'Roberto Portales', email: 'roberto@indusync.cl' });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
  };

  const changeRole = switchRole; // Alias de compatibilidad

  const hasPermission = () => true;

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      switchRole, 
      changeRole,
      hasPermission, 
      ROLES, 
      ROLE_DETAILS 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      isAuthenticated: true,
      user: { role: ROLES.CSUITE, name: 'Roberto Portales', email: 'roberto@indusync.cl' },
      login: () => {},
      logout: () => {},
      switchRole: () => {},
      changeRole: () => {},
      hasPermission: () => true,
      ROLES,
      ROLE_DETAILS
    };
  }
  return context;
};
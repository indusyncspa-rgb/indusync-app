import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Roles disponibles en la plataforma industrial
export const ROLES = {
  ADMIN: 'admin',
  CSUITE: 'csuite',
  MINA_OPERATOR: 'mina_operator',
  SCADA_TECH: 'scada_tech',
  ESG_AUDITOR: 'esg_auditor'
};

// Permisos por rol para acceder a categorías de src/features
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['csuite', 'mina', 'gemelo', 'scada', 'esg', 'cyber', 'marketplace'],
  [ROLES.CSUITE]: ['csuite', 'gemelo', 'esg', 'marketplace'],
  [ROLES.MINA_OPERATOR]: ['mina', 'gemelo', 'cyber'],
  [ROLES.SCADA_TECH]: ['mina', 'scada', 'gemelo'],
  [ROLES.ESG_AUDITOR]: ['esg', 'marketplace']
};

export function AuthProvider({ children }) {
  // Usuario inicial activo para desarrollo
  const [user, setUser] = useState({
    id: 'usr-001',
    name: 'Roberto Silva',
    role: ROLES.ADMIN,
    email: 'roberto@indusync.com'
  });

  const hasPermission = (categoryKey) => {
    if (!user || !user.role) return false;
    const allowedCategories = ROLE_PERMISSIONS[user.role] || [];
    return allowedCategories.includes(categoryKey);
  };

  const switchRole = (newRole) => {
    setUser(prev => ({ ...prev, role: newRole }));
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission, switchRole, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
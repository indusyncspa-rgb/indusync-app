import React, { useState, useEffect } from 'react';

const Gatekeeper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Revisa si ya ingresamos la clave antes para no pedirla en cada recarga
  useEffect(() => {
    const auth = localStorage.getItem('indusync_stealth_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // CLAVE MAESTRA: Cámbiala por la que tú quieras
    if (password === 'INDUSYNC-ROOT-2026') {
      setIsAuthenticated(true);
      localStorage.setItem('indusync_stealth_auth', 'true');
      setError('');
    } else {
      setError('Acceso denegado. Protocolo de seguridad activado.');
      setPassword('');
    }
  };

  // Si está autenticado, muestra la página real (el Pitch Deck)
  if (isAuthenticated) {
    return children;
  }

  // Si NO está autenticado, muestra esta pantalla negra de bloqueo
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '8px', border: '1px solid #334155', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>INDUSYNC Meta-OS</h1>
        <p style={{ margin: '0 0 30px 0', fontSize: '14px', color: '#94a3b8' }}>Acceso Restringido. Propiedad Intelectual en Modo Stealth.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="password"
            placeholder="Ingrese Código de Acceso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#0f172a', color: 'white', outline: 'none', textAlign: 'center', letterSpacing: '2px' }}
            autoFocus
          />
          {error && <span style={{ color: '#ef4444', fontSize: '12px' }}>{error}</span>}
          <button 
            type="submit"
            style={{ padding: '12px', borderRadius: '4px', backgroundColor: '#3b82f6', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
          >
            VERIFICAR CREDENCIALES
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gatekeeper;
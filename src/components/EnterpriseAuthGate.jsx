import React, { useState } from 'react';

const EnterpriseAuthGate = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);
  const [credenciales, setCredenciales] = useState({ usuario: '', clave: '', rol: 'C-SUITE' });
  const [mfaPin, setMfaPin] = useState('');
  const [pasoMfa, setPasoMfa] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (credenciales.usuario.trim() === '' || credenciales.clave.trim() === '') {
      setError('Ingrese credenciales corporativas válidas.');
      return;
    }
    setError('');
    setPasoMfa(true);
  };

  const handleValidarMFA = (e) => {
    e.preventDefault();
    if (mfaPin.length === 6) {
      setAutenticado(true);
    } else {
      setError('Código PIN de seguridad inválido (requiere 6 dígitos).');
    }
  };

  if (autenticado) {
    return <>{children}</>;
  }

  return (
    <div style={{
      backgroundColor: '#020617',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '440px',
        width: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{ fontSize: '32px' }}>🔒</span>
          <h2 style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 'bold', margin: '8px 0 4px 0' }}>
            INDUSYNC® ENTERPRISE
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
            Plataforma de Control Autónomo & Inteligencia Minera Tier-1
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#450a0a', border: '1px solid #f43f5e', color: '#fecdd3', padding: '10px', borderRadius: '6px', fontSize: '11px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        {!pasoMfa ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Rol de Acceso Corporativo
              </label>
              <select
                value={credenciales.rol}
                onChange={(e) => setCredenciales({ ...credenciales, rol: e.target.value })}
                style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', padding: '10px', borderRadius: '6px', fontSize: '12px' }}
              >
                <option value="C-SUITE">Gerencia General / C-Suite (Acceso Total)</option>
                <option value="OPERACIONES">Superintendencia de Operaciones Mina</option>
                <option value="HSEC">Gerencia HSEC & SERNAGEOMIN</option>
                <option value="PROVEEDOR">Proveedor Licitante B2B</option>
              </select>
            </div>

            <div>
              <label style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Usuario / Correo Minero
              </label>
              <input
                type="text"
                placeholder="ejemplo@minera.com"
                value={credenciales.usuario}
                onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
                style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', padding: '10px', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Contraseña Encriptada
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={credenciales.clave}
                onChange={(e) => setCredenciales({ ...credenciales, clave: e.target.value })}
                style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', padding: '10px', borderRadius: '6px', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '8px' }}
            >
              Autenticar Credenciales Corporate 🔑
            </button>
          </form>
        ) : (
          <form onSubmit={handleValidarMFA} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ backgroundColor: '#0c4a6e', padding: '12px', borderRadius: '6px', border: '1px solid #0284c7' }}>
              <p style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                🛡️ Verificación Biométrica / Token MFA
              </p>
              <p style={{ color: '#bae6fd', fontSize: '10px', margin: 0 }}>
                Ingrese el código de 6 dígitos enviado a su dispositivo seguro o token físico.
              </p>
            </div>

            <div>
              <label style={{ color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                Código Token MFA (Prueba: 123456)
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={mfaPin}
                onChange={(e) => setMfaPin(e.target.value)}
                style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '10px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', letterSpacing: '4px', textAlign: 'center', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
            >
              Ingresar a Sala de Mando 🚀
            </button>
          </form>
        )}

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #1e293b', textAlign: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '10px' }}>
            Cumplimiento Estándar Cyber-OT IEC 62443 / NIST SP 800-82
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseAuthGate;
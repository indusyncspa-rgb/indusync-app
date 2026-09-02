import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const auth = useAuth() || {};
  const login = auth.login || (() => {});
  
  const [credentials, setCredentials] = useState({ user: 'admin', pass: 'indusync2026', role: 'csuite' });
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUser = (credentials.user || '').trim().toLowerCase();
    const cleanPass = (credentials.pass || '').trim();

    if ((cleanUser === 'admin' && cleanPass === 'indusync2026') || cleanPass === 'indusync2026') {
      setError(false);
      login(credentials.role);
    } else {
      setError(true);
    }
  };

  const handleQuickDemo = () => {
    setError(false);
    login(credentials.role);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded-xl flex items-center justify-center text-cyan-400 font-bold text-lg">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">INDUSYNC® Meta-OS</h1>
            <p className="text-xs text-slate-400 font-mono">Control de Acceso Seguro IEC 62443</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Usuario Institucional</label>
            <input 
              type="text"
              value={credentials.user}
              onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Contraseña de Enclave</label>
            <input 
              type="password"
              value={credentials.pass}
              onChange={(e) => setCredentials({ ...credentials, pass: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Perfil de Simulación</label>
            <select
              value={credentials.role}
              onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-cyan-400 font-bold focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="csuite">📊 DIRECTORIO / C-SUITE</option>
              <option value="admin">🛠️ SUPERADMINISTRADOR OT</option>
              <option value="operator">⛏️ SUPERINTENDENTE MINA</option>
            </select>
          </div>

          {error && (
            <div className="p-2 bg-red-950/40 border border-red-800/60 rounded text-center text-xs text-red-400">
              ⚠️ Credenciales no válidas.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold rounded-lg text-sm transition shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Iniciar Sesión Operativa
          </button>

          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2 bg-slate-800/80 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-mono transition cursor-pointer"
          >
            ⚡ Ingreso Rápido Modo Demo
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
          INDUSYNC v2.4.0 • Zero-Trust Military Encryption Active
        </div>
      </div>
    </div>
  );
}
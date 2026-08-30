import React from 'react';
import { useSystem } from '../context/SystemContext';

export default function Header() {
  const { estadoSistema, alertaActiva } = useSystem();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '20px', marginBottom: '25px' }}>
      <div>
        <h1 style={{ margin: 0, color: '#38bdf8', fontSize: '26px', fontWeight: '800' }}>INDUSYNC <span style={{ color: '#ffffff', fontWeight: '300' }}>Meta-OS</span></h1>
        <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Plataforma de Orquestación Inteligente para la Alta Minería</p>
      </div>
      <div style={{ backgroundColor: '#0f172a', padding: '10px 18px', borderRadius: '8px', border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ height: '10px', width: '10px', backgroundColor: alertaActiva ? '#ef4444' : '#10b981', borderRadius: '50%', boxShadow: alertaActiva ? '0 0 8px #ef4444' : '0 0 8px #10b981' }}></span>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: alertaActiva ? '#f87171' : '#34d399' }}>{estadoSistema}</span>
      </div>
    </header>
  );
}
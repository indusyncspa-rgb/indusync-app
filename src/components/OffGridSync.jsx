import React, { useState } from 'react';

const OffGridSync = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [colaPendiente, setColaPendiente] = useState(0);

  const alternarConexion = () => {
    const nuevoEstado = !onlineStatus;
    setOnlineStatus(nuevoEstado);
    if (!nuevoEstado) {
      setColaPendiente(3);
    } else {
      setTimeout(() => setColaPendiente(0), 1500);
    }
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          📡 Módulo 3: Arquitectura Resiliente Off-Grid & Auto-Sync
        </h3>
        <button 
          onClick={alternarConexion}
          style={{ backgroundColor: onlineStatus ? '#ef4444' : '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
          {onlineStatus ? 'Simular Pérdida de Enlace Satelital' : 'Restablecer Enlace Starlink'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <div style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', borderLeft: `3px solid ${onlineStatus ? '#10b981' : '#ef4444'}` }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Estado de Red en Faena</span>
          <p style={{ color: onlineStatus ? '#34d399' : '#f87171', fontSize: '15px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {onlineStatus ? '🟢 Enlace Operativo (Starlink Active)' : '🔴 Modo Off-Grid (Base Local Reactiva)'}
          </p>
        </div>

        <div style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #38bdf8' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Cola de Datos Local Storage</span>
          <p style={{ color: '#38bdf8', fontSize: '15px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {colaPendiente === 0 ? '✅ Sincronizado con la Nube' : `⚡ ${colaPendiente} Eventos Ponderados localmente`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OffGridSync;
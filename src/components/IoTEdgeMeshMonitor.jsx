import React, { useState } from 'react';

const IoTEdgeMeshMonitor = () => {
  const [modoOffline, setModoOffline] = useState(false);
  const [sincronizando, setSincronizando] = useState(false);

  const nodosEdge = [
    { id: 'NODE-RAMPA-01', ubicacion: 'Rampa Subterránea Nivel 4', senores: 24, estado: 'ONLINE', latencia: '12 ms' },
    { id: 'NODE-PLANTA-02', ubicacion: 'Chancador Primario (Superficie)', senores: 38, estado: 'ONLINE', latencia: '8 ms' },
    { id: 'NODE-CAEX-104', ubicacion: 'Unidad Móvil CAEX Komatsu', senores: 16, estado: 'ONLINE', latencia: '15 ms' }
  ];

  const alternarConectividad = () => {
    if (!modoOffline) {
      setModoOffline(true);
    } else {
      setSincronizando(true);
      setTimeout(() => {
        setSincronizando(false);
        setModoOffline(false);
      }, 1500);
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #14b8a6', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#2dd4bf', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📡 Red Mesh Edge IoT Off-Grid & Enlace Satelital (Starlink/LEO)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Procesamiento local distribuido con cero pérdida de datos durante caídas de enlace.
          </p>
        </div>
        <button
          onClick={alternarConectividad}
          style={{
            backgroundColor: modoOffline ? '#f59e0b' : '#0d9488',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          {sincronizando ? '🔄 Re-sincronizando en la Nube...' : modoOffline ? '⚠️ Modo Offline Activo (Simular Reconexión)' : '⚡ Simular Corte de Satélite (Ir Offline)'}
        </button>
      </div>

      {/* Banner de Estado de Conectividad */}
      <div style={{
        backgroundColor: modoOffline ? '#78350f' : '#064e3b',
        border: `1px solid ${modoOffline ? '#f59e0b' : '#10b981'}`,
        color: modoOffline ? '#fef08a' : '#a7f3d0',
        padding: '10px 14px',
        borderRadius: '6px',
        fontSize: '12px',
        marginBottom: '16px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center'
      }}>
        <span>
          <strong>Estado de Red:</strong> {modoOffline ? '🔴 SIN CONEXIÓN SATELITAL — Operando en Edge Local (Almacenamiento en Buffer Activo)' : '🟢 ONLINE — Sincronizado con INDUSYNC Cloud (0.2s)'}
        </span>
        <span style={{ fontSize: '10px', backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>
          {modoOffline ? 'Buffer: 1,420 Eventos Guardados' : 'Starlink Latencia: 28ms'}
        </span>
      </div>

      {/* Grid de Nodos en Faena */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        {nodosEdge.map(nodo => (
          <div key={nodo.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#2dd4bf', fontWeight: 'bold', fontSize: '11px' }}>{nodo.id}</span>
              <span style={{
                backgroundColor: modoOffline ? '#854d0e' : '#065f46',
                color: modoOffline ? '#fef08a' : '#34d399',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {modoOffline ? 'BUFFER LOCAL' : nodo.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '12px', margin: '0 0 6px 0', fontWeight: '500' }}>{nodo.ubicacion}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Sensores: <strong>{nodo.senores} Active</strong></span>
              <span>Latencia: <strong>{nodo.latencia}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IoTEdgeMeshMonitor;
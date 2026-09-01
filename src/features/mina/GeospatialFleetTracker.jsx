import React, { useState } from 'react';

const GeospatialFleetTracker = () => {
  const [flota, setFlota] = useState([
    { id: 'CAEX-102', tipo: 'Camión CAEX 320T', sector: 'Rape Fase 4', lat: '-23.6501', lng: '-70.3981', velocidad: '28 km/h', carga: '315 Ton (98%)', estado: 'En Ruta', alerta: false },
    { id: 'PALA-04', tipo: 'Pala Hidráulica CAT 6060', sector: 'Frente de Carguío Norte', lat: '-23.6488', lng: '-70.3955', velocidad: '0 km/h', carga: 'Operativa', estado: 'Cargando', alerta: false },
    { id: 'CAEX-108', tipo: 'Camión CAEX 320T', sector: 'Botadero Este', lat: '-23.6540', lng: '-70.4012', velocidad: '12 km/h', carga: '0 Ton (Vacio)', estado: 'Retorno', alerta: true },
    { id: 'RESC-01', tipo: 'Camión Mantenimiento Móvil', sector: 'Taller Central', lat: '-23.6420', lng: '-70.3910', velocidad: '0 km/h', carga: 'Repuestos V/A', estado: 'Standby', alerta: false }
  ]);

  const despacharRescate = (idCamion) => {
    setFlota(prev => prev.map(u => u.id === idCamion ? { ...u, estado: 'Móvil de Resp. Asignado', alerta: false } : u));
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          🗺️ Módulo GIS: Rastreo Georreferenciado & Control de Flota Heavy Duty
        </h3>
        <span style={{ backgroundColor: '#0284c7', color: '#e0f2fe', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
          GPS / GLONASS / Telemetría IoT en Vivo
        </span>
      </div>

      {/* Simulación Visual de Mapa de Faena */}
      <div style={{ backgroundColor: '#070b12', borderRadius: '6px', border: '1px solid #1e293b', padding: '16px', marginBottom: '14px', position: 'relative', minHeight: '140px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #1f2d40', pb: '6px' }}>
          <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 'bold' }}>📡 Mapa Radar Faena Cordillera (Coordenadas UTM WGS84)</span>
          <span style={{ color: '#10b981', fontSize: '10px' }}>● 4 Unidades en Enlace Activo</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
          {flota.map((u) => (
            <div key={u.id} style={{ backgroundColor: u.alerta ? '#450a0a' : '#0f172a', border: u.alerta ? '1px solid #ef4444' : '1px solid #1e293b', borderRadius: '4px', padding: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: u.alerta ? '#fca5a5' : '#f8fafc', fontSize: '12px' }}>{u.id}</strong>
                <span style={{ fontSize: '10px', color: u.alerta ? '#ef4444' : '#34d399', fontWeight: 'bold' }}>{u.estado}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '10px', margin: '2px 0' }}>{u.tipo} — {u.sector}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
                <span>Vel: {u.velocidad}</span>
                <span>Payload: {u.carga}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla Resumen de Despacho Inteligente */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {flota.filter(u => u.alerta).map((item) => (
          <div key={item.id} style={{ backgroundColor: '#290e0e', padding: '10px 14px', borderRadius: '6px', border: '1px solid #991b1b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#fca5a5', fontSize: '12px' }}>
              ⚠️ <strong>{item.id}</strong> reporta desviación en presión de neumáticos en <strong>{item.sector}</strong>
            </span>
            <button 
              onClick={() => despacharRescate(item.id)}
              style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
              ⚡ Asignar Taller Móvil RESC-01
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeospatialFleetTracker;


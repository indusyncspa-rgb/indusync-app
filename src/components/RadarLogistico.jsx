import React, { useState, useEffect } from 'react';

const RadarLogistico = () => {
  const [unidades, setUnidades] = useState([
    { id: 'M-01', vehiculo: 'Camión Escolta 4x4 (Repuestos Críticos)', ubicacion: 'Ruta B-24 Km 42 (Hacia Minera)', eta: '14 min', tempStock: '-4°C', estado: 'En Ruta GPS Activo' },
    { id: 'M-02', vehiculo: 'Convoy Neumáticos Gigantes CAEX', ubicacion: 'Garita Salida Antofagasta', eta: '48 min', tempStock: 'Ambiente', estado: 'Despachado' },
    { id: 'M-03', vehiculo: 'Dron Autónomo Mantenimiento Express', ubicacion: 'Helipuerto Faena Norte', eta: '4 min', tempStock: 'N/A', estado: 'En Vuelo de Emergencia' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulación telemétrica viva en radar
      setUnidades(prev => prev.map(u => ({
        ...u,
        eta: `${Math.max(1, parseInt(u.eta) - (Math.random() > 0.5 ? 1 : 0))} min`
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
            🛰️ Radar Logístico Satelital & Telemetría GPS en Vivo
          </h3>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>
            Seguimiento de despacho crítico en alta cordillera (Conexión Satelital Starlink Activa)
          </p>
        </div>
        <span style={{ backgroundColor: '#1e1b4b', color: '#818cf8', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', border: '1px solid #3730a3' }}>
          GPS PING: 12ms
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {unidades.map((u) => (
          <div key={u.id} style={{ backgroundColor: '#0b1120', border: '1px solid #1e293b', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 'bold' }}>{u.id} | {u.estado}</span>
              <span style={{ color: '#facc15', fontSize: '11px', fontWeight: 'bold' }}>ETA: {u.eta}</span>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 'bold', margin: '2px 0' }}>{u.vehiculo}</p>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0' }}>📍 {u.ubicacion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadarLogistico;
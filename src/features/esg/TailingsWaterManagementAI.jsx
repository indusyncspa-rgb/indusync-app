import React, { useState } from 'react';

const TailingsWaterManagementAI = () => {
  const [escaneando, setEscaneando] = useState(false);
  const [optimizacionActiva, setOptimizacionActiva] = useState(false);

  const [sensoresRelave, setSensoresRelave] = useState([
    { id: 'PIEZ-01', ubicacion: 'Muro Principal Tranque N°3', parametro: 'Presión de Poro', valor: '42 kPa', estado: 'ESTABLE', gistm: 'CUMPLE' },
    { id: 'INFL-04', ubicacion: 'Pie de Talud Sector Oeste', parametro: 'Infiltración Seepage', valor: '0.12 L/s', estado: 'NORMAL', gistm: 'CUMPLE' },
    { id: 'FLOW-02', ubicacion: 'Tubería Recirculación Planta', parametro: 'Tasa de Recuperación', valor: '82.4%', estado: 'OPTIMIZABLE', gistm: 'ALERTA' }
  ]);

  const optimizarRecirculacionIA = () => {
    setEscaneando(true);
    setTimeout(() => {
      setSensoresRelave(prev =>
        prev.map(s => s.id === 'FLOW-02' ? { ...s, valor: '89.1%', estado: 'ÓPTIMO', gistm: 'CUMPLE' } : s)
      );
      setEscaneando(false);
      setOptimizacionActiva(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #06b6d4', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#22d3ee', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            💧 Depósitos de Relaves & Gestión Hídrica Autónoma (GISTM / ISO 14001)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Monitoreo piezométrico en tiempo real y maximización de tasa de agua recirculada a Planta Concentradora.
          </p>
        </div>
        <button
          onClick={optimizarRecirculacionIA}
          disabled={escaneando}
          style={{
            backgroundColor: escaneando ? '#475569' : '#0891b2',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: escaneando ? 'not-allowed' : 'pointer'
          }}
        >
          {escaneando ? '⚡ Analizando Freatimetría...' : '🎯 Optimizar Recirculación Hídrica IA'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {sensoresRelave.map(s => (
          <div key={s.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#22d3ee', fontWeight: 'bold', fontSize: '11px' }}>{s.id}</span>
              <span style={{
                backgroundColor: s.estado === 'ÓPTIMO' || s.estado === 'ESTABLE' || s.estado === 'NORMAL' ? '#065f46' : '#854d0e',
                color: s.estado === 'ÓPTIMO' || s.estado === 'ESTABLE' || s.estado === 'NORMAL' ? '#34d399' : '#fef08a',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {s.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{s.ubicacion}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>{s.parametro}: <strong style={{ color: '#38bdf8' }}>{s.valor}</strong></span>
              <span>Norma GISTM: <strong style={{ color: '#34d399' }}>{s.gistm}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {optimizacionActiva && (
        <div style={{ backgroundColor: '#083344', border: '1px solid #06b6d4', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#a5f3fc', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>🌊 <strong>Recuperación Hídrica Aumentada:</strong> +6.7% agua fresca ahorrada en cuenca</span>
          <span>📜 <strong>Estándar GISTM:</strong> Reporte auditado enviado a Dirección HSEC</span>
        </div>
      )}
    </div>
  );
};

export default TailingsWaterManagementAI;


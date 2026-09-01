import React, { useState } from 'react';

const SupplyChainProcurementAI = () => {
  const [buscando, setBuscando] = useState(false);
  const [matchCompletado, setMatchCompletado] = useState(false);

  const [repuestos, setRepuestos] = useState([
    { id: 'SKU-VALV-99', descripcion: 'Válvula Reguladora de Flujo 12" (Planta Concentradora)', stockActual: '0 Unidades', leadTime: '180 Días (Importación)', estado: 'CRÍTICO' },
    { id: 'SKU-NEUM-59', descripcion: 'Neumático Gigante CAEX 59/80R63', stockActual: '2 Unidades', leadTime: '45 Días', estado: 'ALERTA' },
    { id: 'SKU-FREN-104', descripcion: 'Kit Discos de Freno Hidráulico Komatsu 930E', stockActual: '12 Unidades', leadTime: '5 Días', estado: 'ÓPTIMO' }
  ]);

  const ejecutarMatchingB2B = () => {
    setBuscando(true);
    setTimeout(() => {
      setRepuestos(prev =>
        prev.map(item =>
          item.id === 'SKU-VALV-99'
            ? { ...item, stockActual: '1 Unidad Disponible (Faena Vecina)', leadTime: '4 Horas (Transporte Terrestre)', estado: 'PRESTAMO INTER-MINERA MATCH' }
            : item
        )
      );
      setBuscando(false);
      setMatchCompletado(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #eab308', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#fde047', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📦 Cadena de Suministro Autónoma & Marketplace Inter-Faenas B2B (IA)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Predicción de quiebre de stock crítico y préstamos cruzados de repuestos entre faenas mineras en tiempo real.
          </p>
        </div>
        <button
          onClick={ejecutarMatchingB2B}
          disabled={buscando}
          style={{
            backgroundColor: buscando ? '#475569' : '#ca8a04',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: buscando ? 'not-allowed' : 'pointer'
          }}
        >
          {buscando ? '🔎 Escaneando Inventarios de la Red B2B...' : '⚡ Correr Match de Insumos Críticos'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {repuestos.map(item => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#fde047', fontWeight: 'bold', fontSize: '11px' }}>{item.id}</span>
              <span style={{
                backgroundColor: item.estado.includes('MATCH') ? '#065f46' : item.estado === 'CRÍTICO' ? '#7f1d1d' : item.estado === 'ALERTA' ? '#78350f' : '#1e3a8a',
                color: item.estado.includes('MATCH') ? '#34d399' : item.estado === 'CRÍTICO' ? '#fca5a5' : item.estado === 'ALERTA' ? '#fef08a' : '#93c5fd',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {item.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{item.descripcion}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Stock: <strong style={{ color: '#f8fafc' }}>{item.stockActual}</strong></span>
              <span>Lead Time: <strong style={{ color: '#fde047' }}>{item.leadTime}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {matchCompletado && (
        <div style={{ backgroundColor: '#422006', border: '1px solid #eab308', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#fef08a', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>🤝 <strong>Préstamo Inter-Minera Confirmado:</strong> Válvula despachada desde Minera Cobre Antofagasta</span>
          <span>📉 <strong>Tiempo de Detención Salvado:</strong> 179 días reducidos a 4 horas</span>
        </div>
      )}
    </div>
  );
};

export default SupplyChainProcurementAI;
import React, { useState } from 'react';

const ESGCarbonTracker = () => {
  const [metricasEsg, setMetricasEsg] = useState({
    co2EvitadoTon: 342.8,
    dieselAhorradoLitros: 128400,
    circularidadPartesPercent: 78.5,
    certificacionGri: 'Cumplimiento Nivel A+'
  });

  const recalcularEsg = () => {
    setMetricasEsg(prev => ({
      ...prev,
      co2EvitadoTon: +(prev.co2EvitadoTon + Math.random() * 4.2).toFixed(1),
      dieselAhorradoLitros: Math.round(prev.dieselAhorradoLitros + Math.random() * 1500)
    }));
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          🌱 Módulo ESG & Reportabilidad de Huella de Carbono (Scope 1 & 2)
        </h3>
        <button 
          onClick={recalcularEsg}
          style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
          ♻️ Simular Auditoría ESG en Vivo
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <div style={{ backgroundColor: '#0b1120', padding: '14px', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Mitigación de CO₂ (Preventiva)</span>
          <p style={{ color: '#34d399', fontSize: '22px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {metricasEsg.co2EvitadoTon} <span style={{ fontSize: '12px', color: '#6ee7b7' }}>Ton CO₂e</span>
          </p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>Equivale a 15,200 árboles sembrados</span>
        </div>

        <div style={{ backgroundColor: '#0b1120', padding: '14px', borderRadius: '6px', borderLeft: '3px solid #06b6d4' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Diésel Evitado por Ralentí</span>
          <p style={{ color: '#38bdf8', fontSize: '22px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {metricasEsg.dieselAhorradoLitros.toLocaleString()} <span style={{ fontSize: '12px', color: '#7dd3fc' }}>Litros</span>
          </p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>Optimización de ciclos CAEX</span>
        </div>

        <div style={{ backgroundColor: '#0b1120', padding: '14px', borderRadius: '6px', borderLeft: '3px solid #a855f7' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Economía Circular (Marketplace B2B)</span>
          <p style={{ color: '#c084fc', fontSize: '22px', fontWeight: 'bold', margin: '4px 0 0 0' }}>
            {metricasEsg.circularidadPartesPercent}%
          </p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>Reutilización de componentes pesados</span>
        </div>

        <div style={{ backgroundColor: '#0b1120', padding: '14px', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Estándar de Reportabilidad</span>
          <p style={{ color: '#fbbf24', fontSize: '14px', fontWeight: 'bold', margin: '8px 0 0 0' }}>
            {metricasEsg.certificacionGri}
          </p>
          <span style={{ color: '#64748b', fontSize: '10px' }}>Compatibilidad GRI & SASB Mining</span>
        </div>
      </div>
    </div>
  );
};

export default ESGCarbonTracker;


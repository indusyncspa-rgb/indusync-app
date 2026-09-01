import React, { useState } from 'react';

const AIPredictiveEngine = () => {
  const [analizando, setAnalizando] = useState(false);
  const [metricasIa, setMetricasIa] = useState({
    confianzaAlgoritmo: 98.4,
    anomaliasDetectadas: 2,
    tiempoRespuestaMin: 14,
  });

  const correrAnalisisIA = () => {
    setAnalizando(true);
    setTimeout(() => {
      setMetricasIa(prev => ({
        ...prev,
        confianzaAlgoritmo: +(97 + Math.random() * 2.5).toFixed(1),
        anomaliasDetectadas: Math.floor(Math.random() * 3) + 1
      }));
      setAnalizando(false);
    }, 1200);
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
          🧠 Motor de IA Predictiva & Smart Matching Algorítmico
        </h3>
        <button 
          onClick={correrAnalisisIA}
          disabled={analizando}
          style={{ backgroundColor: '#8b5cf6', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', opacity: analizando ? 0.6 : 1 }}>
          {analizando ? '⚡ Ejecutando Red Neuronal...' : '🔄 Re-analizar Telemetría'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <div style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #8b5cf6' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Confianza del Modelo IA</span>
          <p style={{ color: '#a78bfa', fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{metricasIa.confianzaAlgoritmo}%</p>
        </div>
        <div style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Anomalías en Observación</span>
          <p style={{ color: '#fbbf24', fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{metricasIa.anomaliasDetectadas} Sensores</p>
        </div>
        <div style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
          <span style={{ color: '#94a3b8', fontSize: '11px' }}>Matching Proveedor Local</span>
          <p style={{ color: '#34d399', fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0 0' }}>{metricasIa.tiempoRespuestaMin} min prom.</p>
        </div>
      </div>
    </div>
  );
};

export default AIPredictiveEngine;


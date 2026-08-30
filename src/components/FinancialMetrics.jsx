import React from 'react';
import { useSystem } from '../context/SystemContext';

export default function FinancialMetrics() {
  const { metricas } = useSystem();

  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
        <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Tiempo Detención Evitado</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#38bdf8' }}>{metricas.tiempoDetencionEvitado}</p>
      </div>
      <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
        <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Impacto Económico Ahorrado</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{metricas.ahorroEstimadoUSD}</p>
      </div>
      <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '10px', border: '1px solid #334155' }}>
        <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Eficiencia Operativa Red</p>
        <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>{metricas.eficienciaRed}</p>
      </div>
    </section>
  );
}
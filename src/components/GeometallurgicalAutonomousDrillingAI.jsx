import React, { useState } from 'react';

const GeometallurgicalAutonomousDrillingAI = () => {
  const [optimizando, setOptimizando] = useState(false);
  const [tronaduraOptimizada, setTronaduraOptimizada] = useState(false);

  const [perforadoras, setPerforadoras] = useState([
    { id: 'DRILL-RIG-01', zona: 'Fase 4 Norte - Banco 3200', durezaRock: 'UCS 185 MPa (Dura)', p80Estimado: '5.2 pulgadas', factorPolvo: '480 g/ton', estado: 'DRILLING MWD' },
    { id: 'DRILL-RIG-02', zona: 'Fase 4 Sur - Banco 3180', durezaRock: 'UCS 110 MPa (Media)', p80Estimado: '3.8 pulgadas', factorPolvo: '360 g/ton', estado: 'DRILLING MWD' },
    { id: 'FLOTATION-CELL-A', zona: 'Planta Concentradora (Línea 1)', durezaRock: 'Ley Cu: 0.82%', p80Estimado: 'Recuperación: 86.4%', factorPolvo: 'Ph: 10.5', estado: 'PROCESANDO' }
  ]);

  const optimizarMallaTronadura = () => {
    setOptimizando(true);
    setTimeout(() => {
      setPerforadoras(prev =>
        prev.map(p =>
          p.id === 'DRILL-RIG-01'
            ? { ...p, p80Estimado: '2.9 pulgadas (Óptimo SAG)', factorPolvo: '520 g/ton (Malla Ajustada)', estado: 'MALLA IA OPTIMIZADA' }
            : p.id === 'FLOTATION-CELL-A'
            ? { ...p, p80Estimado: 'Recuperación: 90.8% (+4.4%)', estado: 'MAXIMA RECUPERACIÓN' }
            : p
        )
      );
      setOptimizando(false);
      setTronaduraOptimizada(true);
    }, 1600);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#34d399', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            💎 Perforación Autónoma, Fragmentación P80 & Geometalurgia IA
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Ajuste dinámico de mallas de tronadura con sensores MWD y predicción de recobre en celdas de flotación.
          </p>
        </div>
        <button
          onClick={optimizarMallaTronadura}
          disabled={optimizando}
          style={{
            backgroundColor: optimizando ? '#475569' : '#059669',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: optimizando ? 'not-allowed' : 'pointer'
          }}
        >
          {optimizando ? '⚡ Analizando MWD y Dureza Malla...' : '🎯 Optimizar Tronadura & Recuperación SAG'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {perforadoras.map(p => (
          <div key={p.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '11px' }}>{p.id}</span>
              <span style={{
                backgroundColor: p.estado.includes('OPTIMIZADA') || p.estado.includes('MAXIMA') ? '#065f46' : '#1e3a8a',
                color: p.estado.includes('OPTIMIZADA') || p.estado.includes('MAXIMA') ? '#34d399' : '#93c5fd',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {p.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{p.zona}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Dureza/Ley: <strong style={{ color: '#38bdf8' }}>{p.durezaRock}</strong></span>
              <span>P80/Rec: <strong style={{ color: '#34d399' }}>{p.p80Estimado}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {tronaduraOptimizada && (
        <div style={{ backgroundColor: '#064e3b', border: '1px solid #34d399', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#a7f3d0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>💥 <strong>Fragmentación P80 Reducida:</strong> Mineral más fino directo a Chancado/Molino SAG (-15% KWh/Ton)</span>
          <span>📈 <strong>Aumento de Recuperación de Cobre:</strong> +4.4% de metal fino recuperado en Flotación</span>
        </div>
      )}
    </div>
  );
};

export default GeometallurgicalAutonomousDrillingAI;
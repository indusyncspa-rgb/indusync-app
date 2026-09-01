import React, { useState } from 'react';

const UndergroundVentilationAI = () => {
  const [optimizando, setOptimizando] = useState(false);
  const [vodActivo, setVodActivo] = useState(false);

  const [nivelesVentilacion, setNivelesVentilacion] = useState([
    { id: 'FAN-NIVEL-300', zona: 'Rampa Principal Subterránea', flujoCFM: '450,000 CFM', gases: 'CO: 8 ppm | NO2: 0.2 ppm', potencia: '100% (Full Speed)', estado: 'DEMANDA MÁXIMA' },
    { id: 'FAN-NIVEL-450', zona: 'Galería de Explotación 12B', flujoCFM: '280,000 CFM', gases: 'CO: 2 ppm | NO2: 0.0 ppm', potencia: '85% (Sin equipos)', estado: 'SOBRE-VENTILANDO' },
    { id: 'FAN-CHIMENEA-02', zona: 'Extracción General Sur', flujoCFM: '520,000 CFM', gases: 'CO: 12 ppm | Polvo OK', potencia: '92%', estado: 'ESTABLE' }
  ]);

  const optimizarVOD = () => {
    setOptimizando(true);
    setTimeout(() => {
      setNivelesVentilacion([
        { id: 'FAN-NIVEL-300', zona: 'Rampa Principal Subterránea', flujoCFM: '420,000 CFM', gases: 'CO: 7 ppm | NO2: 0.2 ppm', potencia: '90%', estado: 'AUTÓNOMO OK' },
        { id: 'FAN-NIVEL-450', zona: 'Galería de Explotación 12B', flujoCFM: '120,000 CFM', gases: 'CO: 2 ppm | NO2: 0.0 ppm', potencia: '35% (Modo Eco)', estado: 'OPTIMIZADO VOD' },
        { id: 'FAN-CHIMENEA-02', zona: 'Extracción General Sur', flujoCFM: '480,000 CFM', gases: 'CO: 10 ppm | Polvo OK', potencia: '85%', estado: 'AUTÓNOMO OK' }
      ]);
      setOptimizando(false);
      setVodActivo(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #06b6d4', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#22d3ee', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🌀 Ventilación por Demanda Autónoma (VOD AI) & Control Atmosférico DS 132
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Modulación inteligente de ventiladores principales según toxicidad de gases y posicionamiento en tiempo real.
          </p>
        </div>
        <button
          onClick={optimizarVOD}
          disabled={optimizando}
          style={{
            backgroundColor: optimizando ? '#475569' : '#0891b2',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: optimizando ? 'not-allowed' : 'pointer'
          }}
        >
          {optimizando ? '⚡ Recalculando CFD y Flujos...' : '🎯 Activar Algoritmo VOD Eco-Mode'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {nivelesVentilacion.map(fan => (
          <div key={fan.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#22d3ee', fontWeight: 'bold', fontSize: '11px' }}>{fan.id}</span>
              <span style={{
                backgroundColor: fan.estado.includes('OPTIMIZADO') || fan.estado.includes('OK') ? '#065f46' : '#854d0e',
                color: fan.estado.includes('OPTIMIZADO') || fan.estado.includes('OK') ? '#34d399' : '#fef08a',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {fan.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{fan.zona}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Flujo: <strong style={{ color: '#38bdf8' }}>{fan.flujoCFM}</strong></span>
              <span>Potencia: <strong style={{ color: '#f8fafc' }}>{fan.potencia}</strong></span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '10px', margin: '4px 0 0 0' }}>
              Nivel de Gases: <strong>{fan.gases}</strong>
            </p>
          </div>
        ))}
      </div>

      {vodActivo && (
        <div style={{ backgroundColor: '#083344', border: '1px solid #06b6d4', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#a5f3fc', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>📉 <strong>Reducción de Consumo Eléctrico:</strong> -31% kW/h en ventilación subterránea</span>
          <span>🦺 <strong>Norma DS 132 SERNAGEOMIN:</strong> Aire limpio garantizado en zonas con personal activo</span>
        </div>
      )}
    </div>
  );
};

export default UndergroundVentilationAI;
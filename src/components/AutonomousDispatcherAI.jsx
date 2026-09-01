import React, { useState } from 'react';

const AutonomousDispatcherAI = () => {
  const [optimizando, setOptimizando] = useState(false);
  const [rutasOptimizadas, setRutasOptimizadas] = useState(false);

  const [flota, setFlota] = useState([
    { id: 'CAEX-101', destino: 'Chancador Primario', espera: '14 min', estado: 'CONGESTIONADO', consumo: '185 L/h' },
    { id: 'CAEX-104', destino: 'Botadero Norte', espera: '2 min', estado: 'FLUIDO', consumo: '142 L/h' },
    { id: 'CAEX-108', destino: 'Stockpile Fase 3', espera: '8 min', estado: 'MEDIO', consumo: '160 L/h' }
  ]);

  const optimizarRutasIA = () => {
    setOptimizando(true);
    setTimeout(() => {
      setFlota([
        { id: 'CAEX-101', destino: 'Stockpile Alternativo B', espera: '3 min', estado: 'OPTIMIZADO', consumo: '148 L/h' },
        { id: 'CAEX-104', destino: 'Botadero Norte', espera: '1 min', estado: 'OPTIMIZADO', consumo: '139 L/h' },
        { id: 'CAEX-108', destino: 'Chancador Secundario', espera: '2 min', estado: 'OPTIMIZADO', consumo: '150 L/h' }
      ]);
      setOptimizando(false);
      setRutasOptimizadas(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #0284c7', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🚜 Dispatcher de Flota Autónomo & Algoritmo Anti-Colas (IA)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Re-enrutamiento dinámico en tiempo real para acelerar ciclos de cargado y minimizar huella de carbono.
          </p>
        </div>
        <button
          onClick={optimizarRutasIA}
          disabled={optimizando}
          style={{
            backgroundColor: optimizando ? '#475569' : '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: optimizando ? 'not-allowed' : 'pointer'
          }}
        >
          {optimizando ? '⚡ Recalculando Matriz de Tráfico...' : '🎯 Optimizar Ciclos de Flota'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {flota.map(camion => (
          <div key={camion.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '12px' }}>{camion.id}</span>
              <span style={{
                backgroundColor: camion.estado === 'OPTIMIZADO' ? '#065f46' : camion.estado === 'CONGESTIONADO' ? '#881337' : '#854d0e',
                color: camion.estado === 'OPTIMIZADO' ? '#34d399' : camion.estado === 'CONGESTIONADO' ? '#fda4af' : '#fef08a',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {camion.estado}
              </span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '11px', margin: '0 0 6px 0' }}>
              <strong>Destino:</strong> {camion.destino}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Cola de espera: <strong style={{ color: '#f8fafc' }}>{camion.espera}</strong></span>
              <span>Consumo: <strong style={{ color: '#38bdf8' }}>{camion.consumo}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {rutasOptimizadas && (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #38bdf8', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#38bdf8', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>📉 <strong>Reducción de Cola en Pala/Chancador:</strong> -78% de tiempo ocioso</span>
          <span>⛽ <strong>Ahorro Estimado:</strong> -450 Litros Diésel / Turno</span>
        </div>
      )}
    </div>
  );
};

export default AutonomousDispatcherAI;
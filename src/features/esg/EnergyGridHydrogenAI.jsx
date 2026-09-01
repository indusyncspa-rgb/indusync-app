import React, { useState } from 'react';

const EnergyGridHydrogenAI = () => {
  const [balanceando, setBalanceando] = useState(false);
  const [optimizacionAplicada, setOptimizacionAplicada] = useState(false);

  const [nodosEnergia, setNodosEnergia] = useState([
    { id: 'PARQUE-SOLAR-01', fuente: 'Planta Fotovoltaica Cordillera', potencia: '42.5 MW', estado: 'GENERANDO', kpi: '100% Limpia' },
    { id: 'BESS-STORAGE-02', fuente: 'Banco Baterías Litio-Ion (BESS)', potencia: '18.0 MWh', estado: 'CARGANDO', kpi: 'SoC 84%' },
    { id: 'H2-DISPENSER-01', fuente: 'Electrolizador & Hidrogenera CAEX', potencia: '450 kg/h', estado: 'ALTA DEMANDA', kpi: 'Peak Shaving Activo' }
  ]);

  const optimizarMicroredIA = () => {
    setBalanceando(true);
    setTimeout(() => {
      setNodosEnergia(prev =>
        prev.map(n => n.id === 'H2-DISPENSER-01' ? { ...n, estado: 'OPTIMIZADO IA', kpi: 'Carga Inteligente (-18% Costo)' } : n)
      );
      setBalanceando(false);
      setOptimizacionAplicada(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#34d399', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Gestor de Microredes & Flotas Cero Emisiones (H2 / CAEX EV)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Orquestación en tiempo real de generación renovable, almacenamiento BESS y recarga de flota limpia.
          </p>
        </div>
        <button
          onClick={optimizarMicroredIA}
          disabled={balanceando}
          style={{
            backgroundColor: balanceando ? '#475569' : '#059669',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: balanceando ? 'not-allowed' : 'pointer'
          }}
        >
          {balanceando ? '🔋 Balanceando Cargas de Red...' : '🌱 Optimizar Balance Energético IA'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {nodosEnergia.map(nodo => (
          <div key={nodo.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '11px' }}>{nodo.id}</span>
              <span style={{
                backgroundColor: nodo.estado.includes('OPTIMIZADO') || nodo.estado === 'GENERANDO' ? '#065f46' : '#854d0e',
                color: nodo.estado.includes('OPTIMIZADO') || nodo.estado === 'GENERANDO' ? '#34d399' : '#fef08a',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {nodo.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{nodo.fuente}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Capacidad: <strong style={{ color: '#38bdf8' }}>{nodo.potencia}</strong></span>
              <span>Métrica: <strong style={{ color: '#34d399' }}>{nodo.kpi}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {optimizacionAplicada && (
        <div style={{ backgroundColor: '#064e3b', border: '1px solid #34d399', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#a7f3d0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>📉 <strong>Ahorro en Horas Punta (Peak Demand):</strong> -22% de costo eléctrico operando con BESS</span>
          <span>🌿 <strong>Reducción CO2e Estimada:</strong> -1,240 Toneladas / Mes</span>
        </div>
      )}
    </div>
  );
};

export default EnergyGridHydrogenAI;


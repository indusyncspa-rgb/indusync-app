import React, { useState } from 'react';

const DigitalTwinPredictiveMaintAI = () => {
  const [analizando, setAnalizando] = useState(false);
  const [diagnosticoCompletado, setDiagnosticoCompletado] = useState(false);

  const [equiposCriticos, setEquiposCriticos] = useState([
    { id: 'SAG-MILL-01', nombre: 'Molino SAG Principal (Planta Concentradora)', tempDescanso: '82°C (Anómalo)', vibracionFFT: '6.8 mm/s', RUL: '72 hrs estimado', estado: 'ALERTA VIBRACIÓN' },
    { id: 'CRUSHER-PRI-02', nombre: 'Chancador Giratorio Primario 60x89', tempDescanso: '54°C', vibracionFFT: '1.9 mm/s', RUL: '1,420 hrs', estado: 'ÓPTIMO' },
    { id: 'CAEX-CAT-797F', nombre: 'Camión CAEX 93 (Mandos Finales)', tempDescanso: '68°C', vibracionFFT: '3.1 mm/s', RUL: '480 hrs', estado: 'NORMAL' }
  ]);

  const ejecutarDiagnosticoFFT = () => {
    setAnalizando(true);
    setTimeout(() => {
      setEquiposCriticos(prev =>
        prev.map(eq =>
          eq.id === 'SAG-MILL-01'
            ? { ...eq, RUL: 'OT SAP #8004921 Creada', estado: 'MANT. PROGRAMADO (CONJUNTO COJINETE)' }
            : eq
        )
      );
      setAnalizando(false);
      setDiagnosticoCompletado(true);
    }, 1600);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #f59e0b', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#fbbf24', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛠️ Gemelo Digital & Mantenimiento Prescriptivo IA (RUL & Vibración FFT)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Cálculo de Vida Útil Restante (RUL) y prevención de fallas catastróficas en Molinos, Chancadores y Flotas.
          </p>
        </div>
        <button
          onClick={ejecutarDiagnosticoFFT}
          disabled={analizando}
          style={{
            backgroundColor: analizando ? '#475569' : '#d97706',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: analizando ? 'not-allowed' : 'pointer'
          }}
        >
          {analizando ? '🔬 Analizando Espectro de Vibración...' : '🔮 Correr Diagnóstico FFT & Generar OT'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {equiposCriticos.map(eq => (
          <div key={eq.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '11px' }}>{eq.id}</span>
              <span style={{
                backgroundColor: eq.estado.includes('PROGRAMADO') ? '#065f46' : eq.estado.includes('ALERTA') ? '#7f1d1d' : '#1e3a8a',
                color: eq.estado.includes('PROGRAMADO') ? '#34d399' : eq.estado.includes('ALERTA') ? '#fca5a5' : '#93c5fd',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {eq.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{eq.nombre}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Vibración: <strong style={{ color: '#f8fafc' }}>{eq.vibracionFFT}</strong></span>
              <span>RUL / Estado: <strong style={{ color: '#fef08a' }}>{eq.RUL}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {diagnosticoCompletado && (
        <div style={{ backgroundColor: '#451a03', border: '1px solid #f59e0b', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#fef08a', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>💰 <strong>Ahorro Estimado por Detención Evitada:</strong> $185,000 USD (3.5 hrs de producción protegidas)</span>
          <span>📦 <strong>Repuesto Solicitado:</strong> Cojinete Hidrostático reservado automáticamente en Bodega Central SAP</span>
        </div>
      )}
    </div>
  );
};

export default DigitalTwinPredictiveMaintAI;


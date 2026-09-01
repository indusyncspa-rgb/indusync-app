import React, { useState } from 'react';

const GeotechnicalSlopeRadarAI = () => {
  const [analizando, setAnalizando] = useState(false);
  const [evacuacionGenerada, setEvacuacionGenerada] = useState(false);

  const [sectores, setSectores] = useState([
    { id: 'SEC-ESTE-04', ubicación: 'Pared Este (Falla Principal)', deformacion: '1.2 mm/día', nivelRiesgo: 'BAJO', accion: 'Monitoreo Normal' },
    { id: 'SEC-NORTE-12', ubicación: 'Banco 320 Rajo Principal', deformacion: '8.7 mm/día', nivelRiesgo: 'CRÍTICO', accion: 'Alerta Preventiva Inminente' },
    { id: 'SEC-SUR-08', ubicación: 'Rampa de Salida CAEX', deformacion: '2.1 mm/día', nivelRiesgo: 'MEDIO', accion: 'Inspección de Dron programada' }
  ]);

  const ejecutarEscaneoGeotecnico = () => {
    setAnalizando(true);
    setTimeout(() => {
      setSectores([
        { id: 'SEC-ESTE-04', ubicación: 'Pared Este (Falla Principal)', deformacion: '1.2 mm/día', nivelRiesgo: 'BAJO', accion: 'Monitoreo Normal' },
        { id: 'SEC-NORTE-12', ubicación: 'Banco 320 Rajo Principal', deformacion: '14.2 mm/día', nivelRiesgo: 'EVACUACIÓN', accion: 'Desvío de Maquinaria Ejecutado' },
        { id: 'SEC-SUR-08', ubicación: 'Rampa de Salida CAEX', deformacion: '1.9 mm/día', nivelRiesgo: 'BAJO', accion: 'Estabilizado' }
      ]);
      setAnalizando(false);
      setEvacuacionGenerada(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #ef4444', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#f87171', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⛰️ Radar Geotécnico de Taludes & Estabilidad de Rajo (IA Predictiva)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Detección milimétrica de micro-desplazamientos de roca para prevención de colapsos y evacuación autónoma.
          </p>
        </div>
        <button
          onClick={ejecutarEscaneoGeotecnico}
          disabled={analizando}
          style={{
            backgroundColor: analizando ? '#475569' : '#dc2626',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: analizando ? 'not-allowed' : 'pointer'
          }}
        >
          {analizando ? '📡 Escaneando Barrido Sub-Milimétrico...' : '🚨 Correr Algoritmo Geotécnico'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {sectores.map(sec => (
          <div key={sec.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#f87171', fontWeight: 'bold', fontSize: '11px' }}>{sec.id}</span>
              <span style={{
                backgroundColor: sec.nivelRiesgo === 'EVACUACIÓN' || sec.nivelRiesgo === 'CRÍTICO' ? '#7f1d1d' : sec.nivelRiesgo === 'MEDIO' ? '#78350f' : '#065f46',
                color: sec.nivelRiesgo === 'EVACUACIÓN' || sec.nivelRiesgo === 'CRÍTICO' ? '#fca5a5' : sec.nivelRiesgo === 'MEDIO' ? '#fef08a' : '#34d399',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {sec.nivelRiesgo}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{sec.ubicación}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Deformación: <strong style={{ color: '#f8fafc' }}>{sec.deformacion}</strong></span>
              <span>Estado: <strong style={{ color: '#fca5a5' }}>{sec.accion}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {evacuacionGenerada && (
        <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#fca5a5', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>⚠️ <strong>Protocolo de Seguridad Ejecutado:</strong> Radio de 200m despejado en Banco 320</span>
          <span>📢 <strong>Aviso a Dispatcher:</strong> Rutas de CAEX-101 y CAEX-104 re-enrutadas autónomamente</span>
        </div>
      )}
    </div>
  );
};

export default GeotechnicalSlopeRadarAI;
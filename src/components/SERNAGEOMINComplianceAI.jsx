import React, { useState } from 'react';

const SERNAGEOMINComplianceAI = () => {
  const [verificando, setVerificando] = useState(false);
  const [auditoriaRealizada, setAuditoriaRealizada] = useState(false);

  const controlesCriticos = [
    { id: 'CC-01', riesgo: 'Atrapamiento en Partes Móviles (Chancado)', estado: 'OK', ultimoControl: 'Hace 10 min', cumplimiento: '100%' },
    { id: 'CC-02', riesgo: 'Contacto con Energía Eléctrica (Subestación N4)', estado: 'OK', ultimoControl: 'Hace 25 min', cumplimiento: '100%' },
    { id: 'CC-03', riesgo: 'Pérdida de Control de Vehículo Pesado (CAEX)', estado: 'ALERTA', ultimoControl: 'En revisión IA', cumplimiento: '92%' },
    { id: 'CC-04', riesgo: 'Caída de Rocas en Frente de Extracción', estado: 'OK', ultimoControl: 'Hace 5 min', cumplimiento: '98%' }
  ];

  const ejecutarAuditoriaIA = () => {
    setVerificando(true);
    setTimeout(() => {
      setVerificando(false);
      setAuditoriaRealizada(true);
    }, 1600);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #f43f5e', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#fb7185', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Matriz de Riesgos Críticos & Cumplimiento SERNAGEOMIN (IA)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Monitoreo autónomo de Controles Críticos que Salvan Vidas y Reglamento de Seguridad Minera (DS 132).
          </p>
        </div>
        <button
          onClick={ejecutarAuditoriaIA}
          disabled={verificando}
          style={{
            backgroundColor: verificando ? '#475569' : '#e11d48',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: verificando ? 'not-allowed' : 'pointer'
          }}
        >
          {verificando ? '🔍 Auditando Controles en Terreno...' : '⚡ Ejecutar Auditoría Preventiva SERNAGEOMIN'}
        </button>
      </div>

      {/* Grid de Controles Críticos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        {controlesCriticos.map(cc => (
          <div key={cc.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '11px' }}>{cc.id}</span>
              <span style={{
                backgroundColor: cc.estado === 'OK' ? '#065f46' : '#854d0e',
                color: cc.estado === 'OK' ? '#34d399' : '#fef08a',
                fontSize: '9px',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {cc.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold', margin: '0 0 6px 0' }}>{cc.riesgo}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Verificación: {cc.ultimoControl}</span>
              <span style={{ color: '#34d399', fontWeight: 'bold' }}>{cc.cumplimiento}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Resultado de la Auditoría */}
      {auditoriaRealizada && (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #fb7185', padding: '14px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#fb7185', fontWeight: 'bold', fontSize: '12px' }}>
              ✅ Dictamen de Conformidad SERNAGEOMIN Generado por IA
            </span>
            <span style={{ color: '#34d399', fontSize: '10px', border: '1px solid #34d399', padding: '2px 8px', borderRadius: '4px' }}>
              Score HSEC: 98.4% (Aprobado)
            </span>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '11px', margin: 0, lineHeight: '1.4' }}>
            <strong>Hallazgo de Inteligencia:</strong> Todos los bloqueos de energía LOTO en Chancado y Subestaciones se encuentran al 100% validados en telemetría. Se recomienda calibración de sensor de fatiga en unidad CAEX #104 antes del inicio del Turno B.
          </p>
        </div>
      )}
    </div>
  );
};

export default SERNAGEOMINComplianceAI;
import React, { useState } from 'react';
import { apiService } from '../services/api'; // Importamos el servicio de API

const ProcurementTenderMatchAI = () => {
  const [analizando, setAnalizando] = useState(false);
  const [licitacionAdjudicada, setLicitacionAdjudicada] = useState(false);
  const [resultadoAPI, setResultadoAPI] = useState(null);

  const [licitacionActual, setLicitacionActual] = useState({
    id: 'LIC-2026-9082',
    titulo: 'Servicio Mantenimiento Correctivo Correas Transportadoras 01-04',
    montoEstimado: '$1,200,000 USD',
    proveedoresMatcheados: [
      { nombre: 'Servicios Industriales Antofagasta SpA', scoreHSEC: '99/100', examenesAlDia: '100% Personal', tiempoRespuesta: '2 Horas', estado: 'RECOMENDADO N°1' },
      { nombre: 'Ingeniería & Montajes del Norte Ltda', scoreHSEC: '94/100', examenesAlDia: '98% Personal', tiempoRespuesta: '6 Horas', estado: 'CALIFICADO' },
      { nombre: 'Mantenimiento Minero Global S.A.', scoreHSEC: '88/100', examenesAlDia: '90% Personal', tiempoRespuesta: '12 Horas', estado: 'EN REVISIÓN' }
    ]
  });

  const correrAlgoritmoAdjudicacion = async () => {
    setAnalizando(true);
    const data = await apiService.procesarMatchLicitacion(licitacionActual.id, 1200000);
    setResultadoAPI(data);
    setAnalizando(false);
    setLicitacionAdjudicada(true);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#34d399', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🤝 Match Autónomo de Licitaciones B2B & Evaluación de Proveedores
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Evaluación en tiempo real de proveedores calificados: Scoring HSEC, exámenes médicos al día y capacidad financiera.
          </p>
        </div>
        <button
          onClick={correrAlgoritmoAdjudicacion}
          disabled={analizando}
          style={{
            backgroundColor: analizando ? '#475569' : '#059669',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: analizando ? 'not-allowed' : 'pointer'
          }}
        >
          {analizando ? '⚖️ Procesando en Servidor...' : '⚡ Correr Match & Recomendar Adjudicación'}
        </button>
      </div>

      <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', marginBottom: '14px', border: '1px solid #334155' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1', marginBottom: '6px' }}>
          <span>ID Licitación: <strong style={{ color: '#38bdf8' }}>{licitacionActual.id}</strong></span>
          <span>Presupuesto Base: <strong style={{ color: '#34d399' }}>{licitacionActual.montoEstimado}</strong></span>
        </div>
        <p style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '12px', margin: 0 }}>{licitacionActual.titulo}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {licitacionActual.proveedoresMatcheados.map((prov, i) => (
          <div key={i} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '11px' }}>{prov.estado}</span>
              <span style={{ backgroundColor: '#065f46', color: '#34d399', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                HSEC: {prov.scoreHSEC}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{prov.nombre}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Exámenes: <strong style={{ color: '#34d399' }}>{prov.examenesAlDia}</strong></span>
              <span>Respuesta: <strong style={{ color: '#f8fafc' }}>{prov.tiempoRespuesta}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {licitacionAdjudicada && resultadoAPI && (
        <div style={{ backgroundColor: '#064e3b', border: '1px solid #34d399', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#a7f3d0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>✅ <strong>Adjudicación Recomendada:</strong> {resultadoAPI.adjudicacionRecomendada.nombre}</span>
          <span>⏱️ <strong>Normativa:</strong> {resultadoAPI.cumplimientoNormativo}</span>
        </div>
      )}
    </div>
  );
};

export default ProcurementTenderMatchAI;
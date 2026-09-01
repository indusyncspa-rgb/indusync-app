import React, { useState } from 'react';

const LiveROICalculator = () => {
  const [flotaCaex, setFlotaCaex] = useState(45);
  const [costoHoraDowntime, setCostoHoraDowntime] = useState(120000);
  const [horasReducidasAnual, setHorasReducidasAnual] = useState(18);

  const ahorroAnualTotal = (costoHoraDowntime * horasReducidasAnual).toLocaleString('en-US');
  const roiEstimadoMultiplier = ((costoHoraDowntime * horasReducidasAnual) / 150000).toFixed(1);

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
          📊 Simulador de Impacto Financiero & Retorno de Inversión (ROI)
        </h3>
        <span style={{ backgroundColor: '#059669', color: '#ecfdf5', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
          Herramienta de Cierre Comercial C-Level
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Controles de Parámetros de Faena */}
        <div style={{ backgroundColor: '#0b1120', padding: '16px', borderRadius: '6px', border: '1px solid #1e293b' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
              Tamaño de Flota Activa (Equipos CAEX / Palas): <strong>{flotaCaex} unidades</strong>
            </label>
            <input 
              type="range" 
              min="10" 
              max="150" 
              value={flotaCaex} 
              onChange={(e) => setFlotaCaex(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#38bdf8' }} 
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
              Costo Estimado Detención No Programada ($ USD / Hora): <strong>${costoHoraDowntime.toLocaleString()} USD</strong>
            </label>
            <input 
              type="range" 
              min="30000" 
              max="350000" 
              step="5000"
              value={costoHoraDowntime} 
              onChange={(e) => setCostoHoraDowntime(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#10b981' }} 
            />
          </div>

          <div>
            <label style={{ color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' }}>
              Horas de Detención Prevenidas al Año (vía IA): <strong>{horasReducidasAnual} hrs</strong>
            </label>
            <input 
              type="range" 
              min="5" 
              max="60" 
              value={horasReducidasAnual} 
              onChange={(e) => setHorasReducidasAnual(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#8b5cf6' }} 
            />
          </div>
        </div>

        {/* Proyección del Ahorro Real */}
        <div style={{ backgroundColor: '#064e3b', border: '1px solid #10b981', padding: '16px', borderRadius: '6px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: '#a7f3d0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Ahorro Anual Directo Proyectado
          </span>
          <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: 'bold', margin: '6px 0' }}>
            ${ahorroAnualTotal} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>USD</span>
          </h2>
          <p style={{ color: '#6ee7b7', fontSize: '12px', margin: 0 }}>
            ⚡ Retorno de Inversión sobre Software: <strong>{roiEstimadoMultiplier}x del contrato</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveROICalculator;
import React from 'react';
import { useSystem } from '@/context/SystemContext';

export default function Telemetry() {
  const { equipoSeleccionado, setEquipoSeleccionado, alertaActiva, procesandoIA, dispararAlertaPredictiva } = useSystem();

  return (
    <section style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h2 style={{ fontSize: '16px', color: '#f1f5f9', marginTop: 0, marginBottom: '15px' }}>Control de Activos en Faena</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', color: '#94a3b8', fontSize: '12px', marginBottom: '6px' }}>Seleccionar Equipo Crítico:</label>
        <select 
          value={equipoSeleccionado} 
          onChange={(e) => setEquipoSeleccionado(e.target.value)}
          style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #475569', borderRadius: '6px', fontSize: '13px' }}
        >
          <option value="Camión CAEX 04">Camión CAEX 04 (Flota Norte)</option>
          <option value="Pala Hidráulica P&H 02">Pala Hidráulica P&H 02 (Planta)</option>
          <option value="Perforadora Pit Viper 01">Perforadora Pit Viper 01 (Rajo)</option>
        </select>
      </div>

      <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #334155' }}>
        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#94a3b8' }}>TELEMETRÍA EN TIEMPO REAL:</p>
        <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#38bdf8' }}>{equipoSeleccionado}</p>
        <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: alertaActiva ? '#ef4444' : '#10b981' }}>
          {alertaActiva ? 'Falla Detectada por IA' : 'Parámetros Normales'}
        </p>
      </div>

      <button 
        onClick={dispararAlertaPredictiva}
        disabled={procesandoIA}
        style={{ 
          width: '100%', 
          padding: '12px', 
          backgroundColor: procesandoIA ? '#475569' : (alertaActiva ? '#b91c1c' : '#0284c7'), 
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: procesandoIA ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '13px'
        }}
      >
        {procesandoIA ? '🤖 Motor IA Calculando RUTA ÓPTIMA...' : (alertaActiva ? '🔄 Alerta Activa - Recalcular IA' : '⚡ Simular Alerta Predictiva')}
      </button>
    </section>
  );
}


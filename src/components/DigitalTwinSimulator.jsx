import React, { useState } from 'react';
import { registrarSolicitudManual } from '../services/apiService';

const DigitalTwinSimulator = () => {
  const [escenario, setEscenario] = useState(null);
  const [cargando, setCargando] = useState(false);

  const ejecutarSimulacion = async (tipo) => {
    setCargando(true);
    const numSolped = Math.floor(1000 + Math.random() * 9000);
    
    if (tipo === 'falla_manga') {
      await registrarSolicitudManual('Manga Térmica Chancado (DESPACHO IA - URGENTE)');
      
      window.dispatchEvent(new CustomEvent('sap-log', {
        detail: { erp: 'SAP S/4HANA PM', item: 'Manga Alta Presión Chancado', id: `SOLPED-${numSolped}`, estado: 'Generado Autónomo (201 Created)' }
      }));

      setEscenario({
        titulo: 'Falla Térmica en Manga de Alta Presión - Chancado',
        impactoSinIndusync: '4.5 hrs de parada ($540,000 USD perdidos)',
        solucionIndusync: 'Despacho automatizado desde proveedor local Antofagasta en 18 min.',
        ahorroNeto: '$480,000 USD'
      });
    } else {
      await registrarSolicitudManual('Repuesto Motor Pala 02 (DESPACHO IA - CRÍTICO)');
      
      window.dispatchEvent(new CustomEvent('sap-log', {
        detail: { erp: 'IBM Maximo Enterprise', item: 'Rodamiento Motor Pala 02', id: `WORK-ORD-${numSolped}`, estado: 'Orden Emitida Autónomamente' }
      }));

      setEscenario({
        titulo: 'Sobrecalentamiento Motor Eléctrico - Pala 02',
        impactoSinIndusync: '8 hrs de detención logística ($960,000 USD perdidos)',
        solucionIndusync: 'Reasignación dinámica de repuesto en stock cercano en 25 min.',
        ahorroNeto: '$850,000 USD'
      });
    }
    setCargando(false);
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
        🕹️ Simulador de Contingencias Operativas (Digital Twin)
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>
        Prueba la respuesta autónoma de INDUSYNC® ante emergencias extremas a 4,000m de altura:
      </p>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <button 
          onClick={() => ejecutarSimulacion('falla_manga')}
          disabled={cargando}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', opacity: cargando ? 0.6 : 1 }}>
          {cargando ? 'Procesando IA...' : 'Simular Falla Chancado'}
        </button>
        <button 
          onClick={() => ejecutarSimulacion('sobrecalentamiento')}
          disabled={cargando}
          style={{ backgroundColor: '#d97706', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', opacity: cargando ? 0.6 : 1 }}>
          {cargando ? 'Procesando IA...' : 'Simular Falla Pala Crítica'}
        </button>
      </div>

      {escenario && (
        <div style={{ backgroundColor: '#0b1120', borderLeft: '4px solid #22c55e', padding: '14px', borderRadius: '6px' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>{escenario.titulo}</h4>
          <p style={{ color: '#ef4444', fontSize: '12px', margin: '2px 0' }}>❌ Sin INDUSYNC®: {escenario.impactoSinIndusync}</p>
          <p style={{ color: '#22c55e', fontSize: '12px', margin: '2px 0' }}>✅ Con INDUSYNC®: {escenario.solucionIndusync}</p>
          <p style={{ color: '#facc15', fontSize: '13px', fontWeight: 'bold', margin: '8px 0 0 0' }}>⚡ Evento insertado en Supabase y SolPed sincronizada en tiempo real con SAP. Ahorro Proyectado: {escenario.ahorroNeto}</p>
        </div>
      )}
    </div>
  );
};

export default DigitalTwinSimulator;
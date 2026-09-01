import React, { useState } from 'react';

const AlertBanner = () => {
  const [alertaActiva, setAlertaActiva] = useState(false);
  const [protocoloIniciado, setProtocoloIniciado] = useState(false);

  const dispararAlerta = () => {
    setAlertaActiva(true);
    setProtocoloIniciado(false);
  };

  const ejecutarProtocolo = () => {
    setProtocoloIniciado(true);
    setTimeout(() => {
      setAlertaActiva(false);
      setProtocoloIniciado(false);
    }, 2500);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {!alertaActiva ? (
        <div style={{ backgroundColor: '#131b29', border: '1px border #1f2d40', padding: '12px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
            Monitoreo en Telemetría Continua (IoT Enlace Activo)
          </span>
          <button 
            onClick={dispararAlerta}
            style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            🚨 Simular Falla Crítica en Faena
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: '#450a0a', border: '2px solid #ef4444', padding: '16px', borderRadius: '8px', animation: 'pulse 2s infinite' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>
                ALERTA P0: DETENCIÓN INMINENTE
              </span>
              <h4 style={{ color: '#fef2f2', fontSize: '14px', margin: '6px 0 2px 0', fontWeight: 'bold' }}>
                ⚠️ Chancador Secundario #3 - Temperatura de Rodamiento &gt; 115°C
              </h4>
              <p style={{ color: '#fca5a5', fontSize: '11px', margin: 0 }}>
                Pérdida estimada si no se interviene: <strong>$140,000 USD / hora</strong>
              </p>
            </div>
            <button 
              onClick={ejecutarProtocolo}
              disabled={protocoloIniciado}
              style={{ backgroundColor: protocoloIniciado ? '#15803d' : '#22c55e', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              {protocoloIniciado ? '⚡ Despachando Proveedor & Repuesto...' : '🚀 Activar Auto-Rescue INDUSYNC®'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertBanner;

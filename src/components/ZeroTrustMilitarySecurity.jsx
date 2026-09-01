import React, { useState } from 'react';

const ZeroTrustMilitarySecurity = () => {
  const [aislandoOT, setAislandoOT] = useState(false);
  const [airGapActivo, setAirGapActivo] = useState(false);

  const [nodosSeguridad, setNodosSeguridad] = useState([
    { id: 'OT-GW-01', zona: 'Red PLC/SCADA Chancado', encriptacion: 'AES-256-GCM (Quantum-Resistant)', amenazas: 0, estado: 'BLINDADO' },
    { id: 'OT-GW-02', zona: 'Telemetría Flota CAEX Starlink', encriptacion: 'mTLS + Token Hardware', amenazas: 1, estado: 'INTENTO BLOQUEADO' },
    { id: 'IT-BRIDGE-03', zona: 'Conector SAP S/4HANA Cloud', encriptacion: 'Zero-Trust Tunnel (IEC 62443)', amenazas: 0, estado: 'PROTEGIDO' }
  ]);

  const activarProtocoloAirGap = () => {
    setAislandoOT(true);
    setTimeout(() => {
      setAislandoOT(false);
      setAirGapActivo(true);
      setNodosSeguridad(prev =>
        prev.map(n => ({ ...n, estado: 'AIR-GAP ISOLATED', encriptacion: 'LnkFisico_Desconectado' }))
      );
    }, 1400);
  };

  return (
    <div style={{ backgroundColor: '#090d16', border: '1px solid #10b981', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#34d399', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Escudo Ciberseguridad Zero-Trust Nivel Militar (IEC 62443 / NIST SP 800-82)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Protección de infraestructura crítica OT/IT, prevención de ransomware y aislamiento físico autónomo.
          </p>
        </div>
        <button
          onClick={activarProtocoloAirGap}
          disabled={aislandoOT || airGapActivo}
          style={{
            backgroundColor: airGapActivo ? '#065f46' : aislandoOT ? '#475569' : '#059669',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: airGapActivo || aislandoOT ? 'not-allowed' : 'pointer'
          }}
        >
          {aislandoOT ? '⚡ Aislando Redes OT...' : airGapActivo ? '🔒 Modo Air-Gap Defensivo Activo' : '🚨 Protocolo Air-Gap Aislamiento Total'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {nodosSeguridad.map(nodo => (
          <div key={nodo.id} style={{ backgroundColor: '#131e32', border: '1px solid #1e293b', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '11px' }}>{nodo.id}</span>
              <span style={{
                backgroundColor: nodo.estado.includes('AIR-GAP') ? '#854d0e' : nodo.estado.includes('BLOQUEADO') ? '#7f1d1d' : '#065f46',
                color: nodo.estado.includes('AIR-GAP') ? '#fef08a' : nodo.estado.includes('BLOQUEADO') ? '#fca5a5' : '#34d399',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {nodo.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{nodo.zona}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Cifrado: <strong style={{ color: '#38bdf8' }}>{nodo.encriptacion}</strong></span>
              <span>Intrusiones: <strong style={{ color: nodo.amenazas > 0 ? '#fb7185' : '#34d399' }}>{nodo.amenazas}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {airGapActivo && (
        <div style={{ backgroundColor: '#064e3b', border: '1px solid #34d399', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#a7f3d0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>🔒 <strong>Aislamiento Físico Activo:</strong> Redes de control mina operando en buffer encriptado local</span>
          <span>🛡️ <strong>Normativa NIST:</strong> 0 vulnerabilidades expuestas a internet externo</span>
        </div>
      )}
    </div>
  );
};

export default ZeroTrustMilitarySecurity;
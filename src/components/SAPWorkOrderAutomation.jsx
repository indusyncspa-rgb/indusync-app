import React, { useState } from 'react';

const SAPWorkOrderAutomation = () => {
  const [alertasPredictivas, setAlertasPredictivas] = useState([
    {
      id: 'ALT-104',
      equipo: 'CAEX #104 (Komatsu 930E)',
      sistema: 'Transmisión / Aceite Hidráulico',
      criticidad: 'ALTA (P1)',
      temperatura: '112 °C (Límite: 95 °C)',
      recomendacion: 'Reemplazo preventivo de kit de sellos y retén de masa',
      otGenerada: null,
      procesando: false
    },
    {
      id: 'ALT-202',
      equipo: 'Chancador Secundario Nivel 4',
      sistema: 'Rodamiento Principal',
      criticidad: 'MEDIA (P2)',
      vibracion: '8.4 mm/s (Límite: 6.0 mm/s)',
      recomendacion: 'Re-engrase de rodamiento y alineación láser',
      otGenerada: null,
      procesando: false
    }
  ]);

  const generarOrdenTrabajoSAP = (idAlerta) => {
    setAlertasPredictivas(prev =>
      prev.map(item => item.id === idAlerta ? { ...item, procesando: true } : item)
    );

    setTimeout(() => {
      const codigoOT = `OT-SAP-${Math.floor(100000 + Math.random() * 900000)}`;
      setAlertasPredictivas(prev =>
        prev.map(item => {
          if (item.id === idAlerta) {
            return {
              ...item,
              procesando: false,
              otGenerada: {
                numeroOT: codigoOT,
                centroCosto: 'CC-3040 (Mantenimiento Mina)',
                puestoTrabajo: 'MEC-TALLER-2',
                horasEstimadas: '4.5 hrs',
                repuestoReservado: 'Kit Retén Transmisión K-930E (Stock: Reservado 1 Unid)',
                estadoSAP: 'TRANSF_SUCCESS_SAP_PM'
              }
            };
          }
          return item;
        })
      );
    }, 1800);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #6366f1', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#818cf8', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ Automatización de Órdenes de Trabajo SAP PM & Repuestos
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Transformador directo de Alertas Predictivas telemétricas a Órdenes de Trabajo (OT) en SAP S/4HANA.
          </p>
        </div>
        <span style={{ backgroundColor: '#312e81', color: '#c7d2fe', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', border: '1px solid #4338ca', fontWeight: 'bold' }}>
          🔗 Bridge SAP S/4HANA Conectado
        </span>
      </div>

      {/* Lista de Alertas Transformables */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {alertasPredictivas.map(alerta => (
          <div key={alerta.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <div>
                <span style={{ color: '#f43f5e', fontSize: '10px', fontWeight: 'bold', border: '1px solid #f43f5e', padding: '2px 6px', borderRadius: '4px', marginRight: '8px' }}>
                  {alerta.criticidad}
                </span>
                <strong style={{ color: '#f8fafc', fontSize: '14px' }}>{alerta.equipo}</strong>
              </div>
              
              {!alerta.otGenerada ? (
                <button
                  onClick={() => generarOrdenTrabajoSAP(alerta.id)}
                  disabled={alerta.procesando}
                  style={{
                    backgroundColor: alerta.procesando ? '#475569' : '#6366f1',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    cursor: alerta.procesando ? 'not-allowed' : 'pointer'
                  }}
                >
                  {alerta.procesando ? '⌛ Creando OT en SAP PM...' : '🚀 Emitir OT SAP PM Automática'}
                </button>
              ) : (
                <span style={{ backgroundColor: '#065f46', color: '#34d399', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ✓ OT Registrada en SAP
                </span>
              )}
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '12px', margin: '4px 0 8px 0' }}>
              <strong>Anomalía:</strong> {alerta.sistema} — <span style={{ color: '#f59e0b' }}>{alerta.temperatura || alerta.vibracion}</span>
            </p>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0 }}>
              💡 <strong>Acción Prescriptiva IA:</strong> {alerta.recomendacion}
            </p>

            {/* Ficha de OT SAP emitida */}
            {alerta.otGenerada && (
              <div style={{ marginTop: '12px', backgroundColor: '#090d16', border: '1px solid #10b981', borderRadius: '6px', padding: '12px', fontSize: '11px' }}>
                <div style={{ color: '#34d399', fontWeight: 'bold', marginBottom: '6px', fontSize: '12px' }}>
                  📋 Confirmación Transaccional SAP S/4HANA:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', color: '#cbd5e1' }}>
                  <div>• <strong>Número de OT:</strong> <span style={{ color: '#38bdf8' }}>{alerta.otGenerada.numeroOT}</span></div>
                  <div>• <strong>Centro Costo:</strong> {alerta.otGenerada.centroCosto}</div>
                  <div>• <strong>Taller Asignado:</strong> {alerta.otGenerada.puestoTrabajo}</div>
                  <div>• <strong>Estimación:</strong> {alerta.otGenerada.horasEstimadas}</div>
                </div>
                <div style={{ marginTop: '6px', color: '#f59e0b', fontSize: '10px' }}>
                  📦 <strong>Reserva de Repuesto:</strong> {alerta.otGenerada.repuestoReservado}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAPWorkOrderAutomation;
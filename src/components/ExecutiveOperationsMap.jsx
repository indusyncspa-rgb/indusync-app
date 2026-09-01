import React, { useState } from 'react';

const ExecutiveOperationsMap = () => {
  const [faenaSeleccionada, setFaenaSeleccionada] = useState('Norte');
  const [capaActiva, setCapaActiva] = useState('TODAS');

  const faenas = {
    Norte: {
      nombre: 'Faena Cobre Alto (Antofagasta)',
      estado: 'OPERATIVA',
      produccion: '142,500 Ton/día',
      eficiencia: '98.2%',
      alertas: 1,
      nodos: [
        { id: 'N1', nombre: 'Rajo Abierto - Sector 4', tipo: 'FLOTA', status: 'OK', detalle: '18 CAEX en ruta | Dispatcher IA Activo' },
        { id: 'N2', nombre: 'Chancador Primario', tipo: 'SAP', status: 'MANTENIMIENTO', detalle: 'OT SAP #80421 - Cambio de revestimiento' },
        { id: 'N3', nombre: 'Subestación Eléctrica Principal', tipo: 'HSEC', status: 'OK', detalle: 'Bloqueo LOTO verificado por SERNAGEOMIN IA' },
        { id: 'N4', nombre: 'Planta de Concentradora', tipo: 'IOT', status: 'OK', detalle: 'Enlace Starlink 12ms | Telemetría Off-Grid OK' }
      ]
    },
    Sur: {
      nombre: 'Mina Subterránea Profunda (Atacama)',
      estado: 'ALERTA PREVENTIVA',
      produccion: '89,100 Ton/día',
      eficiencia: '94.6%',
      alertas: 2,
      nodos: [
        { id: 'S1', nombre: 'Rampa Nivel 400', tipo: 'HSEC', status: 'ALERTA', detalle: 'Sensor de ventilación en ajuste autónomo' },
        { id: 'S2', nombre: 'Correa Transportadora 02', tipo: 'SAP', status: 'OK', detalle: 'Monitoreo de vibración con IA Predictiva' },
        { id: 'S3', nombre: 'Taller de Mantenimiento Subterráneo', tipo: 'FLOTA', status: 'OK', detalle: '3 Equipos LHD en pauta preventiva' }
      ]
    }
  };

  const actual = faenas[faenaSeleccionada];

  return (
    <div style={{ backgroundColor: '#0b1329', border: '1px solid #38bdf8', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
      {/* Encabezado del Centro de Mando */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🗺️</span>
            <h2 style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              INDUSYNC META-OS — Centro de Mando & Mapa Operacional Multi-Faena
            </h2>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '4px 0 0 0' }}>
            Orquestación autónoma en tiempo real sin alterar la infraestructura física o sistemas legacy.
          </p>
        </div>

        {/* Seleccionador de Faena */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFaenaSeleccionada('Norte')}
            style={{
              backgroundColor: faenaSeleccionada === 'Norte' ? '#0284c7' : '#1e293b',
              color: '#fff', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            🏔️ Rajo Cobre Alto
          </button>
          <button
            onClick={() => setFaenaSeleccionada('Sur')}
            style={{
              backgroundColor: faenaSeleccionada === 'Sur' ? '#0284c7' : '#1e293b',
              color: '#fff', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            ⛏️ Subterránea Atacama
          </button>
        </div>
      </div>

      {/* Tarjetas KPI Superiores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '16px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>Ubicación Activa</span>
          <p style={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold', margin: '2px 0 0 0' }}>{actual.nombre}</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #34d399' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>Ritmo de Producción</span>
          <p style={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold', margin: '2px 0 0 0' }}>{actual.produccion}</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>Eficiencia Global (OEE)</span>
          <p style={{ color: '#c084fc', fontSize: '12px', fontWeight: 'bold', margin: '2px 0 0 0' }}>{actual.eficiencia}</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '10px', borderRadius: '6px', borderLeft: '4px solid #f43f5e' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>Alertas Críticas IA</span>
          <p style={{ color: '#fb7185', fontSize: '12px', fontWeight: 'bold', margin: '2px 0 0 0' }}>{actual.alertas} Activas</p>
        </div>
      </div>

      {/* Visualización Táctica del Mapa (Simulación Canvas de Faena) */}
      <div style={{ backgroundColor: '#030712', border: '1px dashed #334155', borderRadius: '8px', padding: '16px', marginBottom: '16px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🛰️ Capa de Geolocalización & Telemetría Satelital Starlink en Vivo
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['TODAS', 'HSEC', 'FLOTA', 'SAP'].map(capa => (
              <button
                key={capa}
                onClick={() => setCapaActiva(capa)}
                style={{
                  backgroundColor: capaActiva === capa ? '#334155' : 'transparent',
                  color: capaActiva === capa ? '#38bdf8' : '#64748b',
                  border: 'none', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer'
                }}
              >
                {capa}
              </button>
            ))}
          </div>
        </div>

        {/* Nodos Interactivos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {actual.nodos
            .filter(n => capaActiva === 'TODAS' || n.tipo === capaActiva)
            .map(nodo => (
              <div
                key={nodo.id}
                style={{
                  backgroundColor: '#0f172a',
                  border: `1px solid ${nodo.status === 'OK' ? '#10b981' : nodo.status === 'MANTENIMIENTO' ? '#f59e0b' : '#ef4444'}`,
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '11px' }}>[{nodo.tipo}] {nodo.id}</span>
                  <span style={{
                    fontSize: '8px',
                    fontWeight: 'bold',
                    padding: '1px 5px',
                    borderRadius: '3px',
                    backgroundColor: nodo.status === 'OK' ? '#065f46' : nodo.status === 'MANTENIMIENTO' ? '#78350f' : '#7f1d1d',
                    color: nodo.status === 'OK' ? '#34d399' : nodo.status === 'MANTENIMIENTO' ? '#fef08a' : '#fca5a5'
                  }}>
                    {nodo.status}
                  </span>
                </div>
                <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{nodo.nombre}</p>
                <p style={{ color: '#94a3b8', fontSize: '10px', margin: 0, lineHeight: '1.3' }}>{nodo.detalle}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOperationsMap;
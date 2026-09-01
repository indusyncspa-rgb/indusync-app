import React, { useState } from 'react';

const ShiftReportAI = () => {
  const [generando, setGenerando] = useState(false);
  const [informeGenerado, setInformeGenerado] = useState(null);

  const datosTurnoActual = {
    turno: 'Turno A - Día (08:00 - 20:00)',
    faena: 'Mina Subterránea / Nivel 4',
    supervisores: 'Ing. R. Morales / J. Pérez',
    toneladasMovidas: '48,250 Ton',
    cumplimientoMeta: '104.2%',
    disponibilidadFlota: '91.8%',
    incidentesSernageomin: 0,
    alertasIAAtendidas: 4
  };

  const ejecutarGeneradorIA = () => {
    setGenerando(true);
    setTimeout(() => {
      setInformeGenerado({
        id: `REP-SHIFT-${Date.now().toString().slice(-4)}`,
        fecha: new Date().toLocaleDateString(),
        resumenEjecutivo: `Durante el Turno A se superó la meta de extracción en un 4.2% (48,250 Ton). La flota CAEX mantuvo un 91.8% de disponibilidad. Se atendió preventivamente la alerta telemétrica sobre el CAEX #104 (sobrecalentamiento de transmisión), evitando un evento P0 de detención crítica. Sin incidentes de seguridad (0 HLT / SERNAGEOMIN).`,
        mantenimientosRecomendados: [
          '🔧 CAEX #104: Inspección de sellos de transmisión programada para Turno B (Taller 2).',
          '⚡ Chancador Secundario: Limpieza de chancado de impacto sugerida a las 02:00 AM.',
          '⛽ Camión Aljibe #02: Recarga de aditivos para humectación de pistas de acarreo Nivel 4.'
        ]
      });
      setGenerando(false);
    }, 1500);
  };

  const descargarInformePDF = () => {
    if (!informeGenerado) return;
    const textoDoc = `
================================================================================
             INDUSYNC® META-OS - INFORME OFICIAL DE CAMBIO DE TURNO
================================================================================
Código de Registro: ${informeGenerado.id}
Fecha de Emisión: ${informeGenerado.fecha}
Turno: ${datosTurnoActual.turno} | Faena: ${datosTurnoActual.faena}
Supervisores a Cargo: ${datosTurnoActual.supervisores}
--------------------------------------------------------------------------------

1. KPI OPERACIONALES DEL TURNO
• Tonelaje Total Extraído: ${datosTurnoActual.toneladasMovidas} (Cumplimiento: ${datosTurnoActual.cumplimientoMeta})
• Disponibilidad Física de Flota: ${datosTurnoActual.disponibilidadFlota}
• Incidentes SERNAGEOMIN: ${datosTurnoActual.incidentesSernageomin} Eventos.
• Alertas Predictivas Resueltas por IA: ${datosTurnoActual.alertasIAAtendidas}

2. RESUMEN EJECUTIVO SINTETIZADO POR IA
${informeGenerado.resumenEjecutivo}

3. HOJA DE RUTA PRESCRIPTIVA PARA EL SIGUIENTE TURNO
${informeGenerado.mantenimientosRecomendados.map(m => `• ${m}`).join('\n')}

================================================================================
Aprobado por Sistema Autónomo INDUSYNC® Engine - Firma Digital: 0x89F2A1
================================================================================
    `;

    const blob = new Blob([textoDoc], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Informe_Turno_INDUSYNC_${informeGenerado.id}.txt`;
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #0284c7', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#38bdf8', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            📋 Informes de Turno & Mantenimiento Prescriptivo IA
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Generación automática de Bitácora Operativa para entrega de turno a Jefes de Mina.
          </p>
        </div>
        <button
          onClick={ejecutarGeneradorIA}
          disabled={generando}
          style={{
            backgroundColor: generando ? '#334155' : '#0284c7',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: generando ? 'not-allowed' : 'pointer'
          }}
        >
          {generando ? '⚡ Sintetizando Telemetría...' : '🤖 Generar Informe de Turno con IA'}
        </button>
      </div>

      {/* Grid de KPIs del Turno */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', border: '1px solid #334155' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>Tonelaje Extraído</span>
          <strong style={{ color: '#38bdf8', fontSize: '16px' }}>{datosTurnoActual.toneladasMovidas}</strong>
          <span style={{ color: '#34d399', fontSize: '10px', display: 'block', marginTop: '2px' }}>Meta: {datosTurnoActual.cumplimientoMeta}</span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', border: '1px solid #334155' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>Disponibilidad Flota</span>
          <strong style={{ color: '#34d399', fontSize: '16px' }}>{datosTurnoActual.disponibilidadFlota}</strong>
          <span style={{ color: '#64748b', fontSize: '10px', display: 'block', marginTop: '2px' }}>Sin detenciones no programadas</span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '12px', borderRadius: '6px', border: '1px solid #334155' }}>
          <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>Seguridad / SERNAGEOMIN</span>
          <strong style={{ color: '#34d399', fontSize: '16px' }}>0 Incidentes</strong>
          <span style={{ color: '#38bdf8', fontSize: '10px', display: 'block', marginTop: '2px' }}>100% Homologado</span>
        </div>
      </div>

      {/* Resultado del Informe de IA */}
      {informeGenerado && (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #10b981', padding: '16px', borderRadius: '6px', color: '#f8fafc', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#34d399', fontWeight: 'bold' }}>✅ {informeGenerado.id} - Listo para Firma Digital</span>
            <button
              onClick={descargarInformePDF}
              style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}
            >
              📥 Descargar Informe Oficial (TXT/PDF)
            </button>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.5', margin: '0 0 12px 0' }}>
            <strong>Resumen Ejecutivo:</strong> {informeGenerado.resumenEjecutivo}
          </p>
          <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '6px' }}>📌 Recomendaciones para el Turno Entrante:</strong>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#94a3b8' }}>
            {informeGenerado.mantenimientosRecomendados.map((rec, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShiftReportAI;
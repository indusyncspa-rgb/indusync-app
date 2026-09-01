import React, { useState, useEffect, useRef } from 'react';

const AIOperationalCopilot = () => {
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      emisor: 'ia',
      hora: '10:02 AM',
      texto: '🤖 **INDUSYNC® AI-Copilot Activo**: Analizando 1,420 sensores de telemetría en tiempo real sobre la flota CAEX y Planta de Chancado.',
      sugerencias: [
        '🔍 Diagnóstico crítico CAEX #104',
        '⚡ Simular detención en Chancador Primario',
        '🚚 Optimizar rutas de despacho autónomo',
        '📄 Generar borrador de Orden de Trabajo SAP'
      ]
    }
  ]);

  const [inputUsuario, setInputUsuario] = useState('');
  const [cargandoIA, setCargandoIA] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes, cargandoIA]);

  const procesarRespuestaIA = (promptTexto) => {
    const textoLower = promptTexto.toLowerCase();
    setCargandoIA(true);

    // Agregar mensaje del usuario
    const nuevoMensajeUsuario = {
      id: Date.now(),
      emisor: 'usuario',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      texto: promptTexto
    };

    setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
    setInputUsuario('');

    setTimeout(() => {
      let respuestaIA = '';
      let sugerencias = [];

      if (textoLower.includes('caex') || textoLower.includes('104')) {
        respuestaIA = `⚠️ **ALERTA PREDICTIVA IA - CAEX #104**:
• **Anomalía Detectada**: Elevación de temperatura en el convertidor de torque (+14.2°C sobre el umbral estándar).
• **Probabilidad de falla en < 6 hrs**: 88.4%.
• **Costo estimado si no se interviene**: ~$180,000 USD por detención no programada en rampa principal.
• **Recomendación Autónoma**: Desviar CAEX #104 a Taller N°2 e ingresar OT en SAP PM.`;
        sugerencias = ['🔧 Crear OT de Emergencia en SAP', '🔄 Redirigir CAEX #104 a Taller 2'];
      } else if (textoLower.includes('chancador') || textoLower.includes('detencion')) {
        respuestaIA = `📊 **SIMULACIÓN DE IMPACTO EN CHANCADOR PRIMARIO**:
• Si el Chancador disminuye su throughput a 80%, se acumularán 12 camiones CAEX en cola de descarga.
• **Pérdida estimada**: 4,200 toneladas de mineral/hora ($126,000 USD/hr).
• **Acción Correctiva Sugerida**: Balancear despacho de carga hacia Acopio Intermedio 3 (Stockpile) para evitar cuello de botella.`;
        sugerencias = ['🔀 Ejecutar Balanceo Autónomo de Carga', '📊 Exportar Simulación en PDF'];
      } else if (textoLower.includes('orden') || textoLower.includes('sap') || textoLower.includes('ot')) {
        respuestaIA = `✅ **ORDEN DE TRABAJO EN SAP PM PRE-GENERADA**:
• **ID Solicitud**: SAP-OT-99482
• **Equipo**: CAEX Komatsu 930E-4 (#104)
• **Prioridad**: P1 - Alta Urgencia
• **Componente**: Filtros y Fluido Hidráulico de Transmisión.
• **Proveedor Asignado Automáticamente**: Komatsu Chile S.A. (Contrato Marco #4502).`;
        sugerencias = ['📩 Enviar Notificación a Jefe de Turno', '✅ Confirmar Despacho de Repuestos'];
      } else {
        respuestaIA = `🧠 **ANÁLISIS GENERAL DE FAENA INDUSYNC®**:
• **Estado de la Flota**: 28 CAEX Operativos | 2 en Mantenimiento | 1 Alerta Temprana.
• **Efectividad Global (OEE)**: 89.2% (+3.4% respecto al turno anterior).
• **Mitigación CO₂ acumulada hoy**: 12.4 Toneladas de CO₂ evitadas mediante optimización de aceleración.`;
        sugerencias = ['🔍 Ver Telemetría Completa', '📈 Analizar OEE del Turno'];
      }

      setMensajes((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          emisor: 'ia',
          hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          texto: respuestaIA,
          sugerencias
        }
      ]);
      setCargandoIA(false);
    }, 1200);
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!inputUsuario.trim()) return;
    procesarRespuestaIA(inputUsuario);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #6366f1', borderRadius: '8px', padding: '20px', marginBottom: '20px', boxShadow: '0 4px 20px rgba(99, 102, 241, 0.15)' }}>
      {/* Header del Agente IA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1e293b', pb: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#4338ca', color: '#fff', width: '38px', height: '38px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', fontWeight: 'bold' }}>
            ⚡
          </div>
          <div>
            <h3 style={{ color: '#818cf8', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              Agente Copiloto IA Operacional (Neural Engine)
              <span style={{ backgroundColor: '#10b98122', color: '#34d399', border: '1px solid #10b981', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>
                LIVE TELEMETRY
              </span>
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
              Procesamiento de LLM Industrial e Inferencia en Tiempo Real
            </p>
          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#cbd5e1', backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155' }}>
          Precisión del Modelo: <strong style={{ color: '#38bdf8' }}>98.6%</strong> | Latencia: <strong style={{ color: '#34d399' }}>42ms</strong>
        </div>
      </div>

      {/* Ventana de Chat de la IA */}
      <div style={{ height: '320px', overflowY: 'auto', backgroundColor: '#090d16', borderRadius: '6px', padding: '16px', border: '1px solid #1e293b', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            style={{
              alignSelf: msg.emisor === 'usuario' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              backgroundColor: msg.emisor === 'usuario' ? '#1e1b4b' : '#131b29',
              border: msg.emisor === 'usuario' ? '1px solid #6366f1' : '1px solid #334155',
              padding: '12px 16px',
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '13px',
              lineHeight: '1.5'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '12px', fontSize: '10px', color: msg.emisor === 'usuario' ? '#a5b4fc' : '#38bdf8' }}>
              <strong>{msg.emisor === 'usuario' ? '👤 Operador / Ingeniero' : '🤖 INDUSYNC® AI Meta-Engine'}</strong>
              <span>{msg.hora}</span>
            </div>

            <div style={{ whiteSpace: 'pre-line' }}>{msg.texto}</div>

            {/* Sugerencias o Botones de Acción Rápida generados por la IA */}
            {msg.sugerencias && msg.sugerencias.length > 0 && (
              <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {msg.sugerencias.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => procesarRespuestaIA(sug.replace(/^[^\w\s]+/, '').trim())}
                    style={{
                      backgroundColor: '#1e293b',
                      color: '#38bdf8',
                      border: '1px solid #0284c7',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      transition: '0.2s',
                      fontWeight: '500'
                    }}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {cargandoIA && (
          <div style={{ alignSelf: 'flex-start', backgroundColor: '#131b29', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px', color: '#94a3b8', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ animation: 'spin 1s linear infinite' }}>⚡</span> Procesando inferencia con datos telemétricos de faena...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input de Prompt Industrial */}
      <form onSubmit={handleEnviar} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Escribe una consulta o instrucción a la IA (ej: 'Diagnóstico CAEX 104', 'Estado del Chancador', 'Sugerir mantenimientos')..."
          value={inputUsuario}
          onChange={(e) => setInputUsuario(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: '#090d16',
            border: '1px solid #475569',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#4338ca',
            color: '#fff',
            border: '1px solid #6366f1',
            padding: '0 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>Preguntar</span> 🚀
        </button>
      </form>
    </div>
  );
};

export default AIOperationalCopilot;
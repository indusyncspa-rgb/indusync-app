import React, { useState } from 'react';

export default function IndustrialCopilotAI() {
  const [pregunta, setPregunta] = useState('');
  const [historial, setHistorial] = useState([
    { emisor: 'ia', texto: '¡Hola! Soy el Copiloto Industrial INDUSYNC. ¿Qué métrica o estado de la mina necesitas consultar?' }
  ]);
  const [cargando, setCargando] = useState(false);

  const enviarConsulta = async (e) => {
    e.preventDefault();
    if (!pregunta.trim()) return;

    const nuevaPregunta = pregunta;
    setHistorial(prev => [...prev, { emisor: 'usuario', texto: nuevaPregunta }]);
    setPregunta('');
    setCargando(true);

    try {
      const res = await fetch('/api/copilot-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: nuevaPregunta })
      });
      const data = await res.json();
      setHistorial(prev => [...prev, { emisor: 'ia', texto: data.respuesta }]);
    } catch (err) {
      setHistorial(prev => [...prev, { emisor: 'ia', texto: '⚠️ Error al conectar con los sensores de la faena.' }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-indigo-500/30 flex flex-col h-[500px]">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
            🤖 Copiloto Industrial AI & Terminal de Comando
          </h2>
          <p className="text-xs text-slate-400">Consultas en tiempo real sobre Telemetría, Relaves, Mantenimiento y Finanzas C1</p>
        </div>
        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono font-bold">
          LLM Operational Agent
        </span>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {historial.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-xs max-w-[85%] ${
              msg.emisor === 'usuario'
                ? 'bg-indigo-600 text-white ml-auto'
                : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            {msg.texto}
          </div>
        ))}
        {cargando && (
          <div className="p-3 bg-slate-800 text-indigo-400 border border-slate-700 rounded-lg text-xs animate-pulse">
            Consultando registros en vivo de la faena...
          </div>
        )}
      </div>

      {/* Prompt Form */}
      <form onSubmit={enviarConsulta} className="mt-4 flex gap-2">
        <input
          type="text"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Ej: ¿Cuál es el estado del molino SAG o los relaves?"
          className="flex-1 px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs focus:outline-none focus:border-indigo-500 text-white"
        />
        <button
          type="submit"
          disabled={cargando}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold text-xs transition"
        >
          Consultar
        </button>
      </form>
    </div>
  );
}
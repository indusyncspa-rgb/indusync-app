import React, { useState } from 'react';

export default function AIOperationalCopilot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '🤖 **Motor IA INDUSYNC Activo.** Detecto estabilidad del 94.2% en Molienda SAG. ¿En qué diagnóstico OT puedo asistirte?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    
    // Simulación de respuesta prescriptiva de IA
    const aiResponse = { 
      sender: 'ai', 
      text: `⚡ **Análisis Copilot OT:** Procesando evento en relación a *"
      ${query}"*.\n\n` +
      `• **Diagnóstico:** Variación de carga hidráulica dentro del rango permitido (3.2% delta).\n` +
      `• **Recomendación:** Mantener flujo de agua en Espesador N°2 a 310 L/s para mitigar desgaste de revestimiento.`
    };

    setMessages((prev) => [...prev, userMsg, aiResponse]);
    setQuery('');
  };

  return (
    <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4 font-sans">
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <h3 className="text-md font-bold text-cyan-400 flex items-center gap-2">
          🤖 Copilot Prescriptivo IA — Mina & Planta
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
          LLM MINERO OT v2.4
        </span>
      </div>

      <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs font-mono">
        {messages.map((m, idx) => (
          <div key={idx} className={`p-3 rounded-lg max-w-[85%] ${
            m.sender === 'user' 
              ? 'ml-auto bg-cyan-950/60 border border-cyan-800/50 text-cyan-200' 
              : 'bg-slate-900 border border-slate-800 text-slate-300'
          }`}>
            <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Consultar anomalía, protocolo ISO o falla de CAEX..."
          className="flex-1 bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2.5 rounded-xl outline-none focus:border-cyan-500 transition"
        />
        <button type="submit" className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition">
          Consultar
        </button>
      </form>
    </div>
  );
}
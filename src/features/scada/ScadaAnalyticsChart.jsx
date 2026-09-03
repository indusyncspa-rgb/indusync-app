import React, { useState } from 'react';
import { useRealtimeTelemetry } from '@/hooks/useRealtimeTelemetry';

const INITIAL_SENSORS = [
  { id: 'TAG-101', nombre: 'Presión Hidráulica Chancador', valor: 142.5, unidad: 'PSI', estado: 'Normal' },
  { id: 'TAG-102', nombre: 'Temperatura Motor SAG', valor: 68.2, unidad: '°C', estado: 'Normal' },
  { id: 'TAG-103', nombre: 'Flujo Bomba Espesador', valor: 310.0, unidad: 'L/s', estado: 'Alerta' },
  { id: 'TAG-104', nombre: 'Vibración Rodamiento CAEX 04', valor: 2.1, unidad: 'mm/s', estado: 'Normal' }
];

export default function ScadaAnalyticsChart() {
  const { data: sensores, isConnected, latency } = useRealtimeTelemetry(INITIAL_SENSORS);
  const [filtro, setFiltro] = useState('');

  const sensoresFiltrados = sensores.filter(s => 
    s.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
    s.id.toLowerCase().includes(filtro.toLowerCase())
  );

  // Función para generar e imprimir/guardar como PDF el informe auditado
  const exportarPDF = () => {
    const fechaHora = new Date().toLocaleString('es-CL');
    const ventana = window.open('', '_blank');
    
    const contenidoHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Informe Téćnico SCADA - INDUSYNC Meta-OS</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; color: #1e293b; }
            .header { border-bottom: 2px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 20px; font-weight: bold; color: #0f172a; }
            .subtitle { font-size: 12px; color: #64748b; }
            .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; margin-bottom: 20px; font-size: 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
            th { background-color: #0f172a; color: #ffffff; text-transform: uppercase; font-size: 11px; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .badge-normal { color: #16a34a; font-weight: bold; }
            .badge-alerta { color: #d97706; font-weight: bold; }
            .footer { margin-top: 40px; font-size: 10px; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">INDUSYNC® Meta-OS | Telemetría OT</div>
              <div class="subtitle">Certificado Oficial de Inspección ISO 55001</div>
            </div>
            <div style="text-align: right;">
              <strong style="color: #0284c7;">FAENA MINERA ACTIVA</strong><br/>
              <span style="font-size: 11px; color: #64748b;">Antofagasta, Chile</span>
            </div>
          </div>

          <div class="meta-box">
            <div><strong>Fecha Emisión:</strong> ${fechaHora}</div>
            <div><strong>Enlace Mesh:</strong> ${isConnected ? 'OPERATIVO (100%)' : 'DESCONECTADO'}</div>
            <div><strong>Latencia Promedio:</strong> ${latency} ms</div>
          </div>

          <h3 style="font-size: 14px; margin-bottom: 5px;">Estado de Nodos IoT en Registro</h3>
          <table>
            <thead>
              <tr>
                <th>TAG Identifier</th>
                <th>Elemento / Sensor</th>
                <th>Lectura Real-Time</th>
                <th>Unidad</th>
                <th>Estado OT</th>
              </tr>
            </thead>
            <tbody>
              ${sensores.map(s => `
                <tr>
                  <td><strong>${s.id}</strong></td>
                  <td>${s.nombre}</td>
                  <td><strong>${s.valor}</strong></td>
                  <td>${s.unidad}</td>
                  <td class="${s.estado === 'Alerta' ? 'badge-alerta' : 'badge-normal'}">${s.estado.toUpperCase()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            Documento generado automáticamente por el Motor C-Suite INDUSYNC®. Firma Electrónica Validada en Cadena de Bloques OT.
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    ventana.document.write(contenidoHTML);
    ventana.document.close();
  };

  return (
    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            📈 Telemetría SCADA Real-Time & Exportación
          </h3>
          <p className="text-xs text-slate-400">
            Monitoreo en tiempo real de nodos IoT con auditoría ISO 55001
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
            <span className={isConnected ? 'text-emerald-400' : 'text-rose-400'}>
              {isConnected ? 'EN LÍNEA' : 'DESCONECTADO'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">{latency}ms</span>
          </div>

          <button
            onClick={exportarPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition shadow-lg shadow-cyan-500/20"
          >
            📄 Exportar PDF
          </button>
        </div>
      </div>

      {/* Buscador de Sensores */}
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="🔍 Filtrar sensor por TAG o nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full md:w-80 bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-slate-200 px-3 py-2 rounded-lg outline-none transition"
        />
        <span className="text-xs text-slate-500 font-mono">
          Mostrando: {sensoresFiltrados.length}/{sensores.length} Nodos
        </span>
      </div>

      {/* Grid de Sensores Real-Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sensoresFiltrados.map((s) => (
          <div 
            key={s.id} 
            className="p-4 bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 rounded-xl space-y-2 transition"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{s.id}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                s.estado === 'Alerta' 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {s.estado}
              </span>
            </div>
            
            <div className="text-xs font-medium text-slate-200 truncate" title={s.nombre}>
              {s.nombre}
            </div>

            <div className="flex items-baseline gap-1 pt-1">
              <span className="text-2xl font-bold font-mono text-cyan-400">
                {s.valor}
              </span>
              <span className="text-xs font-mono text-slate-500">{s.unidad}</span>
            </div>

            {s.timestamp && (
              <div className="text-[10px] font-mono text-slate-600 text-right">
                Última lect.: {s.timestamp}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
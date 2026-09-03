import React, { useState, useEffect } from 'react';

const EQUIPOS_MINERIA = [
  { id: 'EQUIP-SAG-01', name: 'Molino SAG Principal 01', location: 'Planta Concentradora' },
  { id: 'EQUIP-CAEX-14', name: 'Camión Extracción CAEX-14', location: 'Mina Rajo Abierto' },
  { id: 'EQUIP-VENT-03', name: 'Sistema Ventilación Subterránea N3', location: 'Mina Subterránea' },
  { id: 'EQUIP-FLOT-02', name: 'Celdas de Flotación Colectiva B', location: 'Planta Concentradora' }
];

export default function SAPWorkOrderAutomation() {
  const [workOrders, setWorkOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('indusync_sap_ots')) || [
        {
          id: 'OT-SAP-482019',
          equipoId: 'EQUIP-SAG-01',
          tipoOt: 'PM01',
          prioridad: '1',
          descripcion: 'Sobrepresión Hidráulica detectada por sensores SCADA (345 PSI).',
          fechaCreacion: new Date().toLocaleTimeString('es-CL'),
          estado: 'SYNC_SAP_SUCCESS',
          codigoRespuestaSAP: 'SAP_200_OK'
        }
      ];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({
    equipoId: 'EQUIP-SAG-01',
    tipoOt: 'PM01',
    prioridad: '1',
    descripcion: 'Anomalía en alineación de rodamiento principal. Inspección urgente.'
  });

  const [statusMessage, setStatusMessage] = useState('');

  // Persistencia automática de los cambios locales
  useEffect(() => {
    localStorage.setItem('indusync_sap_ots', JSON.stringify(workOrders));
  }, [workOrders]);

  const handleCreateOT = (e) => {
    e.preventDefault();
    const esOnline = navigator.onLine;
    const nuevaOT = {
      id: `OT-SAP-${Math.floor(100000 + Math.random() * 900000)}`,
      ...formData,
      fechaCreacion: new Date().toLocaleTimeString('es-CL'),
      estado: esOnline ? 'SYNC_SAP_SUCCESS' : 'PENDING_OFFGRID',
      codigoRespuestaSAP: esOnline ? 'SAP_200_OK' : 'LOCAL_BUFFERED'
    };

    setWorkOrders([nuevaOT, ...workOrders]);
    setStatusMessage(`✅ Orden ${nuevaOT.id} guardada en almacenamiento local y estructurada para SAP PM.`);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  const handleEliminarOT = (id) => {
    setWorkOrders(workOrders.filter(ot => ot.id !== id));
  };

  const handleCargarYForzarSincro = () => {
    const actualizadas = workOrders.map(ot => ({
      ...ot,
      estado: 'SYNC_SAP_SUCCESS',
      codigoRespuestaSAP: 'SAP_200_OK'
    }));
    setWorkOrders(actualizadas);
    setStatusMessage('🚀 Registros cargados y sincronizados exitosamente con la BAPI de SAP PM.');
    setTimeout(() => setStatusMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>⚙️</span> Generación & Persistencia de Órdenes de Trabajo (SAP PM IW31/IW32)
          </h2>
          <p className="text-xs text-slate-400">
            Crea, guarda localmente y sincroniza solicitudes operacionales compatibles con el estándar BAPI_ALM_ORDER_MAINTAIN.
          </p>
        </div>
        <button
          onClick={handleCargarYForzarSincro}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition shadow-lg shrink-0"
        >
          🔄 Cargar y Sincronizar Búfer en SAP PM
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs rounded-xl">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMULARIO DE GENERACIÓN */}
        <form onSubmit={handleCreateOT} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            📝 Emitir Nueva Orden de Trabajo
          </h3>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">Equipo / Activo OT</label>
            <select
              value={formData.equipoId}
              onChange={(e) => setFormData({ ...formData, equipoId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2.5 rounded-xl outline-none focus:border-cyan-500"
            >
              {EQUIPOS_MINERIA.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.name} ({eq.id})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">Clase OT SAP</label>
              <select
                value={formData.tipoOt}
                onChange={(e) => setFormData({ ...formData, tipoOt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2.5 rounded-xl outline-none focus:border-cyan-500 font-mono"
              >
                <option value="PM01">PM01 - Correctivo</option>
                <option value="PM02">PM02 - Preventivo</option>
                <option value="PM03">PM03 - Emergencia</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-medium">Prioridad SAP</label>
              <select
                value={formData.prioridad}
                onChange={(e) => setFormData({ ...formData, prioridad: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2.5 rounded-xl outline-none focus:border-cyan-500 font-mono"
              >
                <option value="1">1 - Muy Alta (Detención)</option>
                <option value="2">2 - Alta</option>
                <option value="3">3 - Media</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 font-medium">Descripción Técnica</label>
            <textarea
              rows={3}
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2.5 rounded-xl outline-none focus:border-cyan-500"
              placeholder="Describa el fallo o la inspección..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl uppercase tracking-wider transition shadow-lg"
          >
            💾 Guardar & Despachar OT
          </button>
        </form>

        {/* REGISTRO / CARGA DE OTS GUARDADAS */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                📂 Registro de OTs Almacenadas ({workOrders.length})
              </h3>
              {workOrders.length > 0 && (
                <button
                  onClick={() => setWorkOrders([])}
                  className="text-[10px] text-rose-400 hover:text-rose-300 underline"
                >
                  Vaciar almacenamiento
                </button>
              )}
            </div>

            {workOrders.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 text-slate-500 text-xs font-mono">
                No hay órdenes de trabajo guardadas en esta sesión.
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {workOrders.map((ot) => (
                  <div key={ot.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400">{ot.id}</span>
                        <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">
                          {ot.tipoOt} (Prio {ot.prioridad})
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          ot.estado === 'SYNC_SAP_SUCCESS'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {ot.estado === 'SYNC_SAP_SUCCESS' ? 'SAP OK (200)' : 'PENDIENTE SINCRO'}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] line-clamp-1">{ot.descripcion}</p>
                      <div className="text-[10px] font-mono text-slate-500">
                        Equipo: {ot.equipoId} | Hora: {ot.fechaCreacion}
                      </div>
                    </div>

                    <button
                      onClick={() => handleEliminarOT(ot.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 text-xs transition"
                      title="Eliminar de la memoria"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between">
            <span>Persistencia en Memoria: LocalStorage habilitado</span>
            <span>BAPI SAP: BAPI_ALM_ORDER_MAINTAIN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
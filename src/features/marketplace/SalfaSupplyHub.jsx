import React, { useState } from 'react';

export default function SalfaSupplyHub() {
  const [activeTab, setActiveTab] = useState('picking');
  const [busquedaSap, setBusquedaSap] = useState('');
  const [pickingList, setPickingList] = useState([
    { id: 'VL-0291', item: 'Filtro de Aceite Donaldson P550388', stock: '14 un', rack: 'ZMM-CAM-04', status: 'DISPONIBLE' },
    { id: 'VL-0292', item: 'Pastillas de Freno Mineras HD (Mazda BT-50 / Hilux)', stock: '8 un', rack: 'ZMM-CAM-12', status: 'RESERVADO' },
    { id: 'VL-0293', item: 'Kit Mangueras Hidráulicas Alta Presión 3/4"', stock: '22 m', rack: 'ZMM-HID-01', status: 'DISPONIBLE' }
  ]);

  return (
    <div className="space-y-6 font-sans text-slate-100">
      {/* Encabezado del Módulo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold">
              SALFA OS • B2B INTEGRATION
            </span>
            <span className="text-xs text-slate-400 font-mono">SAP Middleware Bridge (VL02N)</span>
          </div>
          <h2 className="text-lg font-black tracking-wide text-white mt-1">
            Gestión de Suministros y Picking Logístico
          </h2>
        </div>

        <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('picking')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'picking' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            📋 Picking Slips (VL02N)
          </button>
          <button
            onClick={() => setActiveTab('racks')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'racks' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            📍 Ubicación Racks (ZMM_CAM)
          </button>
        </div>
      </div>

      {/* Contenido Dinámico */}
      {activeTab === 'picking' ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              value={busquedaSap}
              onChange={(e) => setBusquedaSap(e.target.value)}
              placeholder="Buscar por código SAP, repuesto o rack..."
              className="w-full max-w-md bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-2 text-xs font-mono text-slate-200 outline-none"
            />
            <button
              onClick={() => alert("Sincronización manual ejecutada con SAP ECC / S/4HANA.")}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow"
            >
              🔄 Sincronizar SAP VL02N
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">ID Picking</th>
                  <th className="p-3">Descripción de Componente</th>
                  <th className="p-3">Stock Físico</th>
                  <th className="p-3">Ubicación Rack</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pickingList.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 text-cyan-400 font-bold">{row.id}</td>
                    <td className="p-3 text-slate-200">{row.item}</td>
                    <td className="p-3 text-slate-300">{row.stock}</td>
                    <td className="p-3 text-amber-300">{row.rack}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => alert(`Generando guía de despacho para ${row.id}`)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] transition"
                      >
                        Generar Guía
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Mapeo Georreferenciado de Bodega (ZMM_CAM_UBI_MAT)</h3>
          <p className="text-xs text-slate-400">
            Control visual de pasillos, racks de repuestos críticos para minería y flotas en terreno en el norte grande.
          </p>
          <div className="p-8 bg-slate-950 border border-slate-800 rounded-xl text-center font-mono text-xs text-cyan-400">
            [ Mapa de Racks y Sensores IoT Activos - Conexión MQTT en Tiempo Real ]
          </div>
        </div>
      )}
    </div>
  );
}
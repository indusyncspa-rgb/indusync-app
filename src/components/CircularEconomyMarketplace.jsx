import React, { useState } from 'react';

export default function CircularEconomyMarketplace() {
  const [mundoActivo, setMundoActivo] = useState('mundo3');
  const [modalPublicar, setModalPublicar] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  // Datos de ejemplo para el Marketplace de Excedentes (Mundo 3)
  const excedentes = [
    {
      id: 'EXC-8801',
      titulo: 'Flota 3 Camiones CAEX Caterpillar 797F (Para Overhaul / Repuestos)',
      categoria: 'flota',
      ubicacion: 'Faena Cordillera Norte',
      precioUSD: 450000,
      condicion: 'Usado / De baja operativa',
      impactoESG: '380 Ton CO2e evitadas por valorización de acero',
      vendedor: 'Minera Los Salares'
    },
    {
      id: 'EXC-8802',
      titulo: '45 Toneladas de Chatarra Ferrosa Estructural y Revestimientos Molino',
      categoria: 'chatarra',
      ubicacion: 'Patio de Acopio Central - Sector B',
      precioUSD: 12500,
      condicion: 'Reciclaje / Fundición',
      impactoESG: '45 Ton de residuo desviado de vertedero',
      vendedor: 'División El Tatio'
    },
    {
      id: 'EXC-8803',
      titulo: 'Motor Diésel Cummins QSK60 - Sobrestock Nuevo sin Uso',
      categoria: 'repuestos',
      ubicacion: 'Bodega Central Antofagasta',
      precioUSD: 180000,
      condicion: 'Nuevo en Embalaje Original',
      impactoESG: 'Liberación de US$ 180k en Capital Paralizado',
      vendedor: 'Servicios Mineros del Norte'
    }
  ];

  // Datos para Mantenimiento JIT & Repuestos (Mundo 2)
  const solicitudesRepuestos = [
    {
      id: 'REP-2026-09',
      equipo: 'Chancador Secundario CS-02',
      repuestoRequerido: 'Manto y Cóncavo de Acero al Manganeso High-Cr',
      prioridad: 'CRÍTICA (Detención Programada 48 hrs)',
      ofertasRecibidas: 4,
      tiempoRespuestaPromedio: '18 min'
    }
  ];

  const excedentesFiltrados = filtroCategoria === 'todos' 
    ? excedentes 
    : excedentes.filter(item => item.categoria === filtroCategoria);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-emerald-500/30 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-400">♻️ Ecosistema B2B & Economía Circular Minera</h2>
          <p className="text-xs text-slate-400">
            Licitaciones Express, Repuestos JIT y Marketplace de Excedentes: Eliminación de Patios de Acopio
          </p>
        </div>
        <button
          onClick={() => setModalPublicar(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs rounded transition shadow-lg flex items-center gap-2"
        >
          ➕ Publicar Excedente / Activo en Desuso
        </button>
      </div>

      {/* Navegación entre los 3 Mundos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setMundoActivo('mundo1')}
          className={`p-3 rounded-lg text-left border transition ${
            mundoActivo === 'mundo1'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <div className="text-xs font-bold font-mono">MUNDO 1</div>
          <div className="text-sm font-black text-slate-200">🤝 Licitaciones Express</div>
          <div className="text-[10px] text-slate-400 mt-1">Matching mandante-proveedor en minutos</div>
        </button>

        <button
          onClick={() => setMundoActivo('mundo2')}
          className={`p-3 rounded-lg text-left border transition ${
            mundoActivo === 'mundo2'
              ? 'bg-amber-950/60 border-amber-500 text-amber-300'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <div className="text-xs font-bold font-mono">MUNDO 2</div>
          <div className="text-sm font-black text-slate-200">⚙️ Repuestos JIT & Mantenimiento</div>
          <div className="text-[10px] text-slate-400 mt-1">Enlace automático SAP PM con distribuidores</div>
        </button>

        <button
          onClick={() => setMundoActivo('mundo3')}
          className={`p-3 rounded-lg text-left border transition ${
            mundoActivo === 'mundo3'
              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
          }`}
        >
          <div className="text-xs font-bold font-mono">MUNDO 3</div>
          <div className="text-sm font-black text-slate-200">♻️ Marketplace Excedentes ESG</div>
          <div className="text-[10px] text-slate-400 mt-1">Venta de chatarra, flotas, herramientas y sobrestock</div>
        </button>
      </div>

      {/* MUNDO 3: MARKETPLACE DE EXCEDENTES MINEROS */}
      {mundoActivo === 'mundo3' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-300 font-bold">Filtrar Categoria:</span>
            <div className="flex gap-2">
              {['todos', 'chatarra', 'flota', 'repuestos'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltroCategoria(cat)}
                  className={`px-3 py-1 rounded text-xs capitalize ${
                    filtroCategoria === cat ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {excedentesFiltrados.map((item) => (
              <div key={item.id} className="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {item.id}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.ubicacion}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{item.titulo}</h4>
                  <p className="text-xs text-slate-400 mt-1">Estado: <strong>{item.condicion}</strong></p>
                  <p className="text-xs text-slate-400">Vendedor: <strong>{item.vendedor}</strong></p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 space-y-2">
                  <div className="bg-emerald-950/40 p-2 rounded border border-emerald-900/50 text-[11px] text-emerald-300 font-medium">
                    🌱 Impacto ESG: {item.impactoESG}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-emerald-400">${item.precioUSD.toLocaleString()} USD</span>
                    <button 
                      onClick={() => alert(`Iniciando negociación oferta para ${item.id}`)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold transition"
                    >
                      🛒 Ofertar / Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MUNDO 2: REPUESTOS Y MANTENIMIENTO JIT */}
      {mundoActivo === 'mundo2' && (
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-amber-400">⚙️ Solicitudes Activas de Repuestos Críticos (SAP PM Auto-Link)</h3>
          {solicitudesRepuestos.map((sol) => (
            <div key={sol.id} className="p-3 bg-slate-900 rounded border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400">{sol.id} — {sol.equipo}</span>
                <h4 className="text-sm font-bold text-slate-200">{sol.repuestoRequerido}</h4>
                <p className="text-xs text-rose-400 font-bold mt-0.5">Estado: {sol.prioridad}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{sol.ofertasRecibidas} Proveedores Cotizando</span>
                <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded text-xs font-bold text-slate-950">
                  Ver Ofertas y Decidir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MUNDO 1: LICITACIONES B2B */}
      {mundoActivo === 'mundo1' && (
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-2 text-xs text-slate-300">
          <h3 className="text-sm font-bold text-cyan-400">🤝 Licitaciones Activas en Tiempo Real</h3>
          <p>Modulo de Calificación de Proveedores y Contratación Express configurado y enlazado con la base de datos de mandantes.</p>
        </div>
      )}

      {/* Modal Simulación Publicación Excedente */}
      {modalPublicar && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-emerald-500/50 p-6 rounded-xl max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-emerald-400">📢 Publicar en Marketplace de Excedentes</h3>
            
            <div>
              <label className="text-xs text-slate-400 block mb-1">Título del Activo / Chatarra:</label>
              <input type="text" placeholder="Ej: 20 Toneladas de Cable de Cobre de Descarte" className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white" />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Categoría:</label>
              <select className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white">
                <option>Chatarra Ferrosa / No Ferrosa</option>
                <option>Flota & Maquinaria Pesada (CAEX, Palas)</option>
                <option>Repuestos Sobrestock / Bodega</option>
                <option>Herramientas & Equipos Menores</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Precio Esperado (USD):</label>
              <input type="number" placeholder="15000" className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-xs text-white" />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setModalPublicar(false)} className="px-3 py-1.5 bg-slate-800 rounded text-xs font-bold">Cancelar</button>
              <button 
                onClick={() => {
                  alert('¡Activo publicado exitosamente en el Marketplace INDUSYNC!');
                  setModalPublicar(false);
                }} 
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
              >
                Publicar Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';

const ClientOnboardingBilling = () => {
  const [clientes, setClientes] = useState([
    { id: 'CLI-001', empresa: 'Minera Centinela (Antofagasta Minerals)', faena: 'Planta Sulfuros', plan: 'Piloto MVP (30 Días)', estado: 'Activo', mrr: 0, fechaAlta: '2026-08-15' },
    { id: 'CLI-002', empresa: 'Codelco División Chuquicamata', faena: 'Mina Subterránea', plan: 'Enterprise Full Fleet', estado: 'Cotizado', mrr: 18500, fechaAlta: '2026-08-28' }
  ]);

  const [nuevoCliente, setNuevoCliente] = useState({
    empresa: '',
    faena: '',
    contactoEmail: '',
    plan: 'Piloto MVP (14 Días Gratis)'
  });

  const [mostrarModalCotizacion, setMostrarModalCotizacion] = useState(false);
  const [cotizacionEmitida, setCotizacionEmitida] = useState(null);

  const handleAgregarCliente = (e) => {
    e.preventDefault();
    if (!nuevoCliente.empresa || !nuevoCliente.faena) return;

    const mrrVal = nuevoCliente.plan.includes('Enterprise') ? 18500 : nuevoCliente.plan.includes('SaaS') ? 4500 : 0;

    const clienteCreado = {
      id: `CLI-00${clientes.length + 1}`,
      empresa: nuevoCliente.empresa,
      faena: nuevoCliente.faena,
      plan: nuevoCliente.plan,
      estado: mrrVal > 0 ? 'Cotización Emitida' : 'Piloto Activo',
      mrr: mrrVal,
      fechaAlta: new Date().toISOString().split('T')[0]
    };

    setClientes([clienteCreado, ...clientes]);
    setCotizacionEmitida(clienteCreado);
    setMostrarModalCotizacion(true);
    setNuevoCliente({ empresa: '', faena: '', contactoEmail: '', plan: 'Piloto MVP (14 Días Gratis)' });
  };

  const descargarPropuestaPDF = (cliente) => {
    const contenidoPropuesta = `
================================================================================
             INDUSYNC® META-OS - PROPUESTA COMERCIAL & CONTRATO PILOTO
================================================================================
Fecha de Emisión: ${new Date().toLocaleDateString()}
Código de Documento: REF-${cliente.id}-2026
Cliente: ${cliente.empresa}
Faena / Instalación: ${cliente.faena}
--------------------------------------------------------------------------------

1. DETALLE DEL SERVICIO
- Servicio: Plataforma de Orquestación Logística & Mantenimiento Predictivo IA
- Nivel de Plan: ${cliente.plan}
- Valor Mensual Proyectado: $${cliente.mrr.toLocaleString()} USD / mes
- Periodo de Prueba Garantizado: 30 días de marcha blanca operativa sin costo.

2. COMPROMISOS DE DESEMPEÑO (SLA)
- Tiempo de respuesta en fallas críticas (P0): < 15 minutos
- Disponibilidad del sistema Off-Grid Satelital: 99.9%
- Retorno de Inversión Esperado (ROI): Reducción mínima del 40% en tiempos muertos.

3. DATOS DE FACTURACIÓN & ALTA
INDUSYNC SpA - RUT: 77.892.310-K
Contacto de Soporte: operaciones@indusync.com | Antofagasta, Chile
================================================================================
    `;

    const blob = new Blob([contenidoPropuesta], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Cotizacion_INDUSYNC_${cliente.empresa.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
  };

  const totalMRRProyectado = clientes.reduce((acc, curr) => acc + curr.mrr, 0);

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            💼 Módulo de Alta de Clientes Piloto & Monetización Directa
          </h3>
          <p style={{ color: '#64748b', fontSize: '11px', margin: '2px 0 0 0' }}>
            Empieza a probar en faenas reales y genera propuestas comerciales inmediatas.
          </p>
        </div>
        <div style={{ backgroundColor: '#065f46', border: '1px solid #10b981', padding: '6px 14px', borderRadius: '6px' }}>
          <span style={{ color: '#a7f3d0', fontSize: '10px', display: 'block' }}>MRR Proyectado (Facturación)</span>
          <strong style={{ color: '#34d399', fontSize: '16px' }}>${totalMRRProyectado.toLocaleString()} USD/mes</strong>
        </div>
      </div>

      {/* Formulario de Registro de Cliente */}
      <form onSubmit={handleAgregarCliente} style={{ backgroundColor: '#0b1120', padding: '16px', borderRadius: '6px', border: '1px solid #1e293b', marginBottom: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <div>
          <label style={{ color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Compañía Minera / Contratista *</label>
          <input 
            type="text" 
            placeholder="Ej: Antofagasta Minerals, BHP" 
            value={nuevoCliente.empresa}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, empresa: e.target.value })}
            style={{ width: '100%', backgroundColor: '#131b29', border: '1px solid #334155', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '12px' }}
            required
          />
        </div>

        <div>
          <label style={{ color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Faena / Yacimiento *</label>
          <input 
            type="text" 
            placeholder="Ej: Minera Pelambres / Frente Norte" 
            value={nuevoCliente.faena}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, faena: e.target.value })}
            style={{ width: '100%', backgroundColor: '#131b29', border: '1px solid #334155', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '12px' }}
            required
          />
        </div>

        <div>
          <label style={{ color: '#94a3b8', fontSize: '11px', display: 'block', marginBottom: '4px' }}>Plan Comercial / Modelo</label>
          <select 
            value={nuevoCliente.plan}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, plan: e.target.value })}
            style={{ width: '100%', backgroundColor: '#131b29', border: '1px solid #334155', color: '#fff', padding: '8px', borderRadius: '4px', fontSize: '12px' }}>
            <option value="Piloto MVP (14 Días Gratis)">🎁 Piloto MVP (14 Días sin costo)</option>
            <option value="Piloto Extendido (30 Días)">⏳ Piloto Extendido (30 Días)</option>
            <option value="SaaS Starter Faena ($4,500 USD/mes)">⚡ SaaS Starter ($4,500 USD/mes)</option>
            <option value="Enterprise Full Fleet ($18,500 USD/mes)">🚀 Enterprise Full Fleet ($18,500 USD/mes)</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button 
            type="submit"
            style={{ width: '100%', backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '9px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
            🚀 Activar Cliente & Cotizar
          </button>
        </div>
      </form>

      {/* Tabla de Clientes Activos y Cotizados */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0b1120', color: '#64748b', borderBottom: '1px solid #1e293b' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>Compañía / Faena</th>
              <th style={{ padding: '10px' }}>Plan Seleccionado</th>
              <th style={{ padding: '10px' }}>Estado</th>
              <th style={{ padding: '10px' }}>Facturación Est.</th>
              <th style={{ padding: '10px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1e293b', color: '#cbd5e1' }}>
                <td style={{ padding: '10px', color: '#38bdf8', fontWeight: 'bold' }}>{c.id}</td>
                <td style={{ padding: '10px' }}>
                  <strong style={{ color: '#f8fafc' }}>{c.empresa}</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: '#64748b' }}>{c.faena}</span>
                </td>
                <td style={{ padding: '10px' }}>{c.plan}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ 
                    backgroundColor: c.estado.includes('Activo') ? '#065f46' : '#854d0e',
                    color: c.estado.includes('Activo') ? '#6ee7b7' : '#fef08a',
                    padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'
                  }}>
                    {c.estado}
                  </span>
                </td>
                <td style={{ padding: '10px', fontWeight: 'bold', color: c.mrr > 0 ? '#34d399' : '#94a3b8' }}>
                  {c.mrr > 0 ? `$${c.mrr.toLocaleString()} USD/mes` : 'Gratuito (Prueba)'}
                </td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => descargarPropuestaPDF(c)}
                    style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                    📥 Emite Cotización
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal / Alerta de Cotización Generada */}
      {mostrarModalCotizacion && cotizacionEmitida && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#131b29', border: '1px solid #10b981', padding: '24px', borderRadius: '12px', maxWidth: '450px', width: '100%' }}>
            <h3 style={{ color: '#34d399', marginTop: 0 }}>🎉 ¡Cliente Registrado Exitosamente!</h3>
            <p style={{ color: '#cbd5e1', fontSize: '13px' }}>
              Se ha habilitado el acceso para <strong>{cotizacionEmitida.empresa}</strong> en la faena <strong>{cotizacionEmitida.faena}</strong>.
            </p>
            <div style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', fontSize: '12px', color: '#94a3b8', marginBottom: '16px' }}>
              • Plan: <strong>{cotizacionEmitida.plan}</strong><br/>
              • Estado: <strong style={{ color: '#38bdf8' }}>Listo para enrolamiento de sensores</strong>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => descargarPropuestaPDF(cotizacionEmitida)}
                style={{ flex: 1, backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                📄 Descargar Cotización PDF
              </button>
              <button 
                onClick={() => setMostrarModalCotizacion(false)}
                style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOnboardingBilling;


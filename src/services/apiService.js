import { supabase } from './supabaseClient';

export const fetchMetricasFinancieras = async () => {
  return {
    tiempoDetencionEvitado: '14.5 hrs',
    ahorroEstimadoUSD: '$145,000',
    eficienciaRed: '98.2%'
  };
};

export const fetchProveedoresIniciales = async () => {
  const { data, error } = await supabase
    .from('proveedores')
    .select('*');
  
  if (error) {
    console.error('Error al cargar proveedores:', error);
    return [];
  }
  
  return data.map(p => ({
    id: p.id,
    nombre: p.nombre,
    insumo: p.insumo,
    tiempo: p.tiempo_eta,
    estado: p.estado_ia,
    precioUSD: `$${p.precio_usd?.toLocaleString() || 0}`
  }));
};

export const solicitarAsignacionIA = async (equipoId) => {
  const { data: provData } = await supabase
    .from('proveedores')
    .select('*');

  // Insertar log de auditoría real en la nube
  await supabase.from('audit_logs').insert([
    { evento: `Alerta predictiva procesada por IA para ${equipoId}` }
  ]);

  return {
    alertaMsg: `⚠️ ALERTA: Falla inminente en componente hidráulico (${equipoId})`,
    ahorroEventoUSD: '$45,000',
    proveedoresActualizados: provData ? provData.map(p => ({
      id: p.id,
      nombre: p.nombre,
      insumo: `${p.insumo} (ASIGNADO POR IA)`,
      tiempo: p.tiempo_eta,
      estado: 'Asignado por IA',
      precioUSD: `$${p.precio_usd?.toLocaleString() || 0}`
    })) : []
  };
};

export const registrarSolicitudManual = async (insumoNombre) => {
  const { data, error } = await supabase
    .from('proveedores')
    .insert([
      { 
        nombre: 'Proveedor Asignado Express', 
        insumo: insumoNombre, 
        tiempo_eta: '10 min', 
        estado_ia: 'Solicitado',
        precio_usd: 5000
      }
    ])
    .select();

  if (error) console.error('Error insertando solicitud:', error);
  return data;
};
// api/shift-logistics.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    let bitacoras = [];
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data } = await supabase.from('bitacora_cambio_turno').select('*').order('timestamp', { ascending: false });
        if (data) bitacoras = data;
      } catch (e) {
        console.warn(e.message);
      }
    }

    return res.status(200).json({
      ok: true,
      bitacora: bitacoras.length > 0 ? bitacoras : [
        { id: '1', turno: 'NOCHE_A_DIA', superintendente_saliente: 'Ing. Roberto Silva', tonelaje_entregado: 14250, eventos_criticos: 'Sin novedades mayores en mina.', pendientes_mantenimiento: 'Revisar lubricación Molino 02' }
      ],
      radarLogistico: [
        { insumo: 'Ácido Sulfúrico (Lixiviación)', stockDias: 14, estado: 'NORMAL', ubicacionConvoy: 'Ruta 5 Norte Km 142' },
        { insumo: 'Bolas de Molienda 5.5"', stockDias: 8, estado: 'REAPROVISIONANDO', ubicacionConvoy: 'Puerto Antofagasta' },
        { insumo: 'Nitrato de Amonio (Explosivos)', stockDias: 21, estado: 'OPTIMO', ubicacionConvoy: 'Polvorín Central' }
      ]
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
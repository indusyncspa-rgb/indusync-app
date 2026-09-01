// api/tenders.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { licitacionId, presupuestoUSD } = req.body;
  const idUnico = `${licitacionId || 'LIC-2026-9082'}-${Math.floor(1000 + Math.random() * 9000)}`;

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  let estadoDB = { ok: false, detalle: 'No intentado' };

  if (!supabaseUrl || !supabaseKey) {
    estadoDB = { ok: false, detalle: 'FALTAN_VARIABLES: Revisa las Environment Variables en Vercel.' };
  } else {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from('licitaciones_b2b').insert([
        {
          id: idUnico,
          titulo: 'Servicio Mantenimiento Correctivo Correas Transportadoras 01-04',
          monto_estimado_usd: presupuestoUSD || 1200000,
          plazo_meses: 12,
          estado: 'ADJUDICADA',
          proveedor_adjudicado_id: 'Servicios Industriales Antofagasta SpA'
        }
      ]);

      if (error) {
        estadoDB = { ok: false, detalle: `ERROR_SUPABASE: ${error.message}` };
      } else {
        estadoDB = { ok: true, detalle: 'Guardado exitoso en PostgreSQL', id: idUnico };
      }
    } catch (err) {
      estadoDB = { ok: false, detalle: `EXCEPCION: ${err.message}` };
    }
  }

  return res.status(200).json({
    licitacionId: idUnico,
    adjudicacionRecomendada: {
      nombre: 'Servicios Industriales Antofagasta SpA',
      scoreHSEC: '99/100',
      estado: estadoDB.ok ? 'ADJUDICADO & REGISTRADO EN DB' : 'ADJUDICADO (FALLO REGISTRO DB)'
    },
    cumplimientoNormativo: estadoDB.detalle
  });
}
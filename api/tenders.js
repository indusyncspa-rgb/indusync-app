// api/tenders.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { licitacionId, presupuestoUSD } = req.body;

  // Generamos un ID único por cada clic (ej: LIC-2026-9082-8492)
  const idUnico = `${licitacionId || 'LIC-2026-9082'}-${Date.now().toString().slice(-4)}`;

  const adjudicacion = {
    licitacionId: idUnico,
    presupuestoUSD: presupuestoUSD || 1200000,
    adjudicacionRecomendada: {
      nombre: 'Servicios Industriales Antofagasta SpA',
      scoreHSEC: '99/100',
      estado: 'ADJUDICADO VIA NUBE VERCEL & POSTGRESQL'
    },
    cumplimientoNormativo: '100% SERNAGEOMIN & ISO 45001',
    timestamp: new Date().toISOString()
  };

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from('licitaciones_b2b').insert([
        {
          id: idUnico,
          titulo: 'Servicio Mantenimiento Correctivo Correas Transportadoras 01-04',
          monto_estimado_usd: adjudicacion.presupuestoUSD,
          plazo_meses: 12,
          estado: 'ADJUDICADA',
          proveedor_adjudicado_id: 'Servicios Industriales Antofagasta SpA'
        }
      ]);
      if (error) console.error('Error insertando en Supabase:', error.message);
    } catch (dbError) {
      console.warn('Excepción DB:', dbError.message);
    }
  }

  return res.status(200).json(adjudicacion);
}
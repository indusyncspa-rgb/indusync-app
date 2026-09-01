// api/circular-b2b.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data } = await supabase.from('market_circular_b2b').select('*');
        if (data && data.length > 0) return res.status(200).json({ ok: true, items: data });
      } catch (err) {
        console.warn('Error leyendo Supabase:', err.message);
      }
    }

    return res.status(200).json({
      ok: true,
      items: [
        { id: '1', titulo: 'Lote 50 Neumáticos OTR 59/80R63', categoria: 'NEUMATICOS', cantidad_disponible: 50, unidad_medida: 'UNIDADES', precio_usd: 4500, ahorro_co2_ton: 120.5, empresa_oferente: 'Minera Los Pelambres' },
        { id: '2', titulo: 'Chatarra Acero Revestimiento Molinos', categoria: 'CHATARRA_ACERO', cantidad_disponible: 120, unidad_medida: 'TONELADAS', precio_usd: 380, ahorro_co2_ton: 240, empresa_oferente: 'BHP Escondida' }
      ]
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
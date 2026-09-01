// api/accreditation.js
import { createClient } from '@supabase/supabase-client';

const supabaseUrl = process.env.SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'tu-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { rut } = req.query;

    if (rut) {
      const { data, error } = await supabase
        .from('contratistas_acreditacion')
        .select('*')
        .eq('rut', rut)
        .single();

      if (error || !data) {
        return res.status(404).json({ ok: false, mensaje: 'Trabajador no encontrado en registro nacional.' });
      }
      return res.status(200).json({ ok: true, trabajador: data });
    }

    const { data } = await supabase.from('contratistas_acreditacion').select('*');
    return res.status(200).json({ ok: true, nomina: data || [] });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
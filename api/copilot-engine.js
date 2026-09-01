// api/copilot-engine.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { pregunta } = req.body;
    const queryLower = (pregunta || '').toLowerCase();

    let respuestaIA = "Consultando sensores y registros ERP de la faena...";

    if (queryLower.includes('sag') || queryLower.includes('molino') || queryLower.includes('molienda')) {
      respuestaIA = "⚙️ **Estado Molienda SAG 01:** Presión actual 8.5 Bar (Estable). Temperatura rodamientos en 70 °C. Rendimiento al 102.4% del plan del turno.";
    } else if (queryLower.includes('relave') || queryLower.includes('gistm') || queryLower.includes('muro')) {
      respuestaIA = "🏔️ **Depósito de Relaves:** Todos los piezómetros en rango normal (Presión promedio 140.3 kPa). Cumplimiento GISTM 2026 al 100%.";
    } else if (queryLower.includes('camion') || queryLower.includes('ahs') || queryLower.includes('flota')) {
      respuestaIA = "🚛 **Flota Autónoma AHS:** 30 camiones en ciclo activo. Velocidad promedio 44.2 km/h. Tonelaje movilizado actual: 145,000 Ton.";
    } else if (queryLower.includes('costo') || queryLower.includes('c1') || queryLower.includes('cash')) {
      respuestaIA = "💵 **Finanzas C1:** Cash Cost actual en US$ 1.485/lb (Target: US$ 1.550/lb). Margen EBITDA proyectado: 48.2%.";
    } else {
      respuestaIA = "🤖 **Copiloto INDUSYNC:** Operaciones Mina, Planta y SIAM funcionando sin desviaciones críticas. Seguridad TRIFR en 0.42.";
    }

    return res.status(200).json({ ok: true, respuesta: respuestaIA });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
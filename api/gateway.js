import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = req.url || '';

  // 1. Ruta: /api/reports
  if (url.includes('/api/reports')) {
    const fechaActual = new Date().toISOString().split('T')[0];
    return res.status(200).json({
      encabezado: {
        plataforma: 'INDUSYNC META-OS v2026.4',
        faena: 'Distrito Minero Cordillera Tier-1',
        fechaEmision: fechaActual
      },
      resumenCumplimiento: {
        seguridadTRIFR: '0.42 (CONFORME D.S. 132 SERNAGEOMIN)',
        estabilidadRelaves: 'GISTM 2026 - 100% OPERATIVO',
        ciberseguridadOT: 'IEC 62443 SL-3 CERTIFICADO'
      }
    });
  }

  // 2. Ruta: /api/copilot-engine
  if (url.includes('/api/copilot-engine')) {
    const { pregunta = '' } = req.body || {};
    const q = pregunta.toLowerCase();
    let respuestaIA = "🤖 INDUSYNC AI: Operaciones estables en mina y planta.";

    if (q.includes('sag') || q.includes('molino')) {
      respuestaIA = "⚙️ Estado Molienda SAG: Presión 8.5 Bar. Rendimiento al 102.4%.";
    } else if (q.includes('relave') || q.includes('gistm')) {
      respuestaIA = "🏔️ Depósito Relaves: Piezómetros en rango seguro (140.3 kPa). Cero desviaciones.";
    } else if (q.includes('costo') || q.includes('c1')) {
      respuestaIA = "💵 Cash Cost (C1): US$ 1.485/lb (Debajo de la meta de US$ 1.550/lb).";
    }

    return res.status(200).json({ ok: true, respuesta: respuestaIA });
  }

  // 3. Ruta: /api/digital-twin
  if (url.includes('/api/digital-twin')) {
    const { spi = 110, tph = 4200 } = req.body || {};
    const dureza = parseFloat(spi);
    const tonelaje = parseFloat(tph);

    const consumoKwhTon = (12.5 + (dureza - 90) * 0.08).toFixed(2);
    const recuperacion = Math.max(72, Math.min(93, (91.5 - (dureza - 100) * 0.05 - (tonelaje - 4000) * 0.0012))).toFixed(1);

    return res.status(200).json({
      ok: true,
      simulacion: {
        durezaSpi: dureza,
        tonelajeTph: tonelaje,
        consumoKwhTon: Number(consumoKwhTon),
        recuperacionCuPct: Number(recuperacion),
        cuelloBotella: dureza > 125 ? 'Molienda SAG (Alta Dureza)' : 'Ninguno (Óptimo)'
      }
    });
  }

  // 4. Ruta por defecto / Fallback
  return res.status(200).json({ ok: true, status: 'INDUSYNC Unified Gateway Active' });
}
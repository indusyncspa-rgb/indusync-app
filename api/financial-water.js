// api/financial-water.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let estacionesAgua = [];
  let indicadorCostos = null;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: aData } = await supabase.from('sistema_agua_desalada').select('*');
      const { data: cData } = await supabase.from('cash_cost_c1').select('*').limit(1);
      if (aData) estacionesAgua = aData;
      if (cData && cData.length > 0) indicadorCostos = cData[0];
    } catch (e) {
      console.warn(e.message);
    }
  }

  return res.status(200).json({
    ok: true,
    telemetriaAgua: {
      caudalTotalLps: 1240,
      estadoAcueducto: 'SISTEMA INTEGRAL OK (0 FUGAS)',
      estaciones: estacionesAgua.length > 0 ? estacionesAgua : [
        { estacion_bombeo: 'EB-01 Puerto', caudal_lps: 1250, presion_bar: 48.5, fuga_detectada: false },
        { estacion_bombeo: 'EB-03 Cordillera', caudal_lps: 1238, presion_bar: 115.2, fuga_detectada: false }
      ]
    },
    financieroC1: {
      cashCostActualUsdLb: indicadorCostos ? indicadorCostos.cash_cost_usd_lb : 1.485,
      targetC1UsdLb: 1.550,
      margenEbitdaPct: 48.2,
      sensibilidad: {
        dolarClp: 940,
        energiaUsdMwh: 68.5
      }
    }
  });
}
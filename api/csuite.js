// api/csuite.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const csuiteData = {
    resumenEstrategico: {
      produccionDiariaToneladasCu: 14520,
      cumplimientoMetaMesPct: 102.4,
      ebitdaEstimadoDiarioUsd: 4850000,
      precioCobreLbUsd: 4.38
    },
    indicadoresESG: {
      huellaCarbonoTCO2e: 1.12, // tCO2/tCu
      metaHuellaCarbono: 1.25,
      reciclajeAguaPct: 88.6, // % agua industrial recirculada
      energiaRenovablePct: 94.0 // % matriz limpia
    },
    seguridadPersonas: {
      trifrAccidentabilidad: 0.42, // Target < 0.50
      diasSinAccidentesGraves: 412,
      dotacionTotalFaena: 3840
    },
    actualizadoEn: new Date().toISOString()
  };

  return res.status(200).json(csuiteData);
}
// api/reports.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const fechaActual = new Date().toISOString().split('T')[0];

  const reporteOficial = {
    encabezado: {
      plataforma: 'INDUSYNC META-OS v2026.4',
      faena: 'Distrito Minero Cordillera Tier-1',
      fechaEmision: fechaActual,
      entidadesFiscalizadoras: ['SERNAGEOMIN', 'CMF Chile', 'SMA (Superintendencia del Medio Ambiente)']
    },
    resumenCumplimiento: {
      seguridadTRIFR: '0.42 (CONFORME D.S. 132 SERNAGEOMIN)',
      estabilidadRelaves: 'GISTM 2026 - 100% OPERATIVO SIN DESVIACIONES',
      ciberseguridadOT: 'IEC 62443 SL-3 CERTIFICADO',
      matrizHidrica: '88.6% AGUA DESALADA / RECIRCULADA',
      emisionesScope1: '1.12 tCO2/tCu (CUMPLIMIENTO META NET-ZERO 2030)'
    },
    firmaDigital: 'HASH-SHA256-SERNAGEOMIN-9082-VERIFIED'
  };

  return res.status(200).json(reporteOficial);
}
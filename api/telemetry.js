// api/telemetry.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Simulación de lectura de sensores de campo SCADA / IoT
  const telemetriaMina = {
    flotaAutonoma: {
      camionesActivos: Math.floor(28 + Math.random() * 4),
      velocidadPromedioKmh: (42 + Math.random() * 5).toFixed(1),
      tonelajeTurnoActual: Math.floor(142000 + Math.random() * 5000),
      alertaFatigaConductores: '0 ALERTAS (SISTEMA OK)'
    },
    plantaMolienda: {
      presionMolinoSAG: (8.4 + Math.random() * 0.6).toFixed(2) + ' Bar',
      temperaturaRodamientos: (68 + Math.random() * 4).toFixed(1) + ' °C',
      vibracionEstructural: 'NORMAL (0.12 mm/s)'
    },
    estabilidadTalud: {
      deformacionRadarMm: (0.02 + Math.random() * 0.01).toFixed(3),
      estadoFactorSeguridad: 'SEGURO (FS: 1.48)'
    },
    timestamp: new Date().toISOString()
  };

  return res.status(200).json(telemetriaMina);
}
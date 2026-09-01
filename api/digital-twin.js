// api/digital-twin.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { spi = 110, tph = 4200 } = req.body || {};

    const dureza = parseFloat(spi);
    const tonelaje = parseFloat(tph);

    // Algoritmo predictivo de comportamiento del circuito SAG-Flotación
    const consumoKwhTon = (12.5 + (dureza - 90) * 0.08).toFixed(2);
    const recuperacion = Math.max(72, Math.min(93, (91.5 - (dureza - 100) * 0.05 - (tonelaje - 4000) * 0.0012))).toFixed(1);
    
    let cuelloBotella = 'Ninguno (Operación Óptima)';
    if (dureza > 125) cuelloBotella = 'Molienda SAG (Sobrecarga por Dureza)';
    else if (tonelaje > 4500) cuelloBotella = 'Chancado Secundario & Correas';

    return res.status(200).json({
      ok: true,
      simulacion: {
        durezaSpi: dureza,
        tonelajeTph: tonelaje,
        consumoKwhTon: Number(consumoKwhTon),
        recuperacionCuPct: Number(recuperacion),
        cuelloBotella,
        impactoCashCost: ((consumoKwhTon / 14) * 0.025).toFixed(3)
      }
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
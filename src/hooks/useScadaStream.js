import { useState, useEffect } from 'react';

export function useScadaStream(initialValues = {}) {
  const [data, setData] = useState({
    vibracion: initialValues.vibracion || 2.4,
    temperatura: initialValues.temperatura || 68.5,
    tonelaje: initialValues.tonelaje || 4200,
    flujoAgua: initialValues.flujoAgua || 1240,
    historial: []
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const nuevaVibracion = Number((prev.vibracion + (Math.random() * 0.4 - 0.2)).toFixed(2));
        const nuevaTemp = Number((prev.temperatura + (Math.random() * 0.6 - 0.3)).toFixed(1));
        const nuevoTonelaje = Math.floor(prev.tonelaje + (Math.random() * 40 - 20));
        const nuevoFlujo = Math.floor(prev.flujoAgua + (Math.random() * 10 - 5));

        const nuevoPunto = {
          time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          vibracion: nuevaVibracion,
          temperatura: nuevaTemp,
          tonelaje: nuevoTonelaje
        };

        const nuevoHistorial = [...prev.historial, nuevoPunto].slice(-20); // Mantiene últimos 20 puntos

        return {
          vibracion: nuevaVibracion,
          temperatura: nuevaTemp,
          tonelaje: nuevoTonelaje,
          flujoAgua: nuevoFlujo,
          historial: nuevoHistorial
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return data;
}
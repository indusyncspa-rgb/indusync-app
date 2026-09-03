import { useState, useEffect, useRef } from 'react';

export function useRealtimeTelemetry(defaultSensors = []) {
  const [data, setData] = useState(defaultSensors);
  const [isConnected, setIsConnected] = useState(false);
  const [latency, setLatency] = useState(12); // ms
  const wsRef = useRef(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_TELEMETRY_URL;

    // Si hay URL de WebSocket configurada, intenta conexión real
    if (wsUrl) {
      const startTime = performance.now();
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setIsConnected(true);
        setLatency(Math.round(performance.now() - startTime));
      };

      wsRef.current.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          setData(payload);
        } catch (err) {
          console.error("Error parseando telemetría OT:", err);
        }
      };

      wsRef.current.onclose = () => {
        setIsConnected(false);
      };

      return () => {
        if (wsRef.current) wsRef.current.close();
      };
    } else {
      // Modo Fallback: Simulación OT Edge (1 segundo)
      const interval = setInterval(() => {
        setData((prev) =>
          prev.map((s) => ({
            ...s,
            valor: +(s.valor + (Math.random() * 2 - 1)).toFixed(2),
            timestamp: new Date().toLocaleTimeString('es-CL')
          }))
        );
        setLatency(10 + Math.floor(Math.random() * 5));
      }, 1000);

      setIsConnected(true);
      return () => clearInterval(interval);
    }
  }, []);

  return { data, isConnected, latency };
}
// Servicio Pub/Sub para flujo de telemetría IoT en tiempo real
class TelemetryService {
  constructor() {
    this.listeners = new Set();
    this.timer = null;
    this.isLive = false;
    this.data = {
      pressure: 142.5,  // PSI
      temperature: 68.2, // °C
      flowRate: 310.0,   // L/s
      activeCaex: 24,
      networkLatency: 12 // ms
    };
  }

  // Suscribir componentes a las lecturas
  subscribe(callback) {
    this.listeners.add(callback);
    if (!this.isLive) this.startStream();
    
    // Retorna función de desuscripción para el useEffect
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0) this.stopStream();
    };
  }

  // Simulación de eventos en tiempo real (remplazable por WebSocket/MQTT)
  startStream() {
    this.isLive = true;
    this.timer = setInterval(() => {
      this.data = {
        pressure: parseFloat((140 + Math.random() * 8).toFixed(1)),
        temperature: parseFloat((65 + Math.random() * 7).toFixed(1)),
        flowRate: parseFloat((300 + Math.random() * 20).toFixed(1)),
        activeCaex: Math.floor(22 + Math.random() * 4),
        networkLatency: Math.floor(10 + Math.random() * 5)
      };

      this.listeners.forEach(callback => callback(this.data));
    }, 1500); // Actualización cada 1.5s
  }

  stopStream() {
    this.isLive = false;
    if (this.timer) clearInterval(this.timer);
  }

  getCurrentData() {
    return this.data;
  }
}

export const telemetryService = new TelemetryService();
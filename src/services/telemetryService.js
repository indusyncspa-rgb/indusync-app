// Servicio Pub/Sub para flujo de telemetría IoT y Flota CAEX
class TelemetryService {
  constructor() {
    this.listeners = new Set();
    this.timer = null;
    this.isLive = false;
    
    this.data = {
      pressure: 142.5,
      temperature: 68.2,
      flowRate: 310.0,
      networkLatency: 12,
      fleet: [
        { id: 'CAEX-01', driver: 'Juan Perez', status: 'Cargando', speed: 0, fuel: 88, fatigueRisk: 'Bajo', location: 'Frente 3 - Banco 1200' },
        { id: 'CAEX-02', driver: 'Carlos Araya', status: 'En Tránsito', speed: 38, fuel: 65, fatigueRisk: 'Medio', location: 'Rampa Principal' },
        { id: 'CAEX-03', driver: 'Maria Silva', status: 'Descargando', speed: 5, fuel: 91, fatigueRisk: 'Bajo', location: 'Chancador Primario' },
        { id: 'CAEX-04', driver: 'Pedro Soto', status: 'Mantenimiento', speed: 0, fuel: 32, fatigueRisk: 'Alto', location: 'Taller Central' }
      ]
    };
  }

  subscribe(callback) {
    this.listeners.add(callback);
    if (!this.isLive) this.startStream();
    
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0) this.stopStream();
    };
  }

  startStream() {
    this.isLive = true;
    this.timer = setInterval(() => {
      this.data.pressure = parseFloat((140 + Math.random() * 8).toFixed(1));
      this.data.temperature = parseFloat((65 + Math.random() * 7).toFixed(1));
      this.data.flowRate = parseFloat((300 + Math.random() * 20).toFixed(1));
      this.data.networkLatency = Math.floor(10 + Math.random() * 5);

      this.data.fleet = this.data.fleet.map(caex => {
        if (caex.status === 'En Tránsito') {
          const newSpeed = Math.floor(25 + Math.random() * 20);
          return { ...caex, speed: newSpeed };
        }
        return caex;
      });

      this.listeners.forEach(callback => callback(this.data));
    }, 1500);
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
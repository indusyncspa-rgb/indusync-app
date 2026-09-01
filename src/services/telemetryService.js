// Servicio Pub/Sub con estado inmutable para SCADA, Flota, Cyber, ESG y C-Suite
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
      ],
      cyber: {
        threatLevel: 'DEFCON 3 - Elevado',
        blockedAttacksToday: 1420,
        activeAnomalies: 2,
        otFirewallStatus: 'Protegido',
        scadaIntegrity: 99.8,
        recentLogs: [
          { time: '16:20:11', source: '192.168.4.12', event: 'Escaneo de puertos no autorizado en red Modbus', severity: 'Media' },
          { time: '16:15:02', source: '10.0.12.88', event: 'Bloqueo de conexión entrante desconocida a PLC chancado', severity: 'Alta' },
          { time: '16:01:45', source: 'Internal-OT', event: 'Verificación de firmas de firmware PLC completada', severity: 'Baja' }
        ]
      },
      esg: {
        carbonFootprint: 1.12,
        waterRecyclingRate: 84.5,
        renewableEnergyShare: 92.0,
        solarGenerationMW: 45.8,
        tailingsDepositStatus: 'Estable (Sensor Inclinométrico Ok)'
      },
      csuite: {
        copperPriceLb: 4.35,
        dailyProductionTons: 12450,
        targetProductionTons: 13000,
        costPerTonUSD: 1.82,
        operatingMarginPercent: 41.5,
        ebitdaForecastMillion: 18.4
      }
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
    if (this.timer) clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.data = {
        ...this.data,
        pressure: parseFloat((140 + Math.random() * 8).toFixed(1)),
        temperature: parseFloat((65 + Math.random() * 7).toFixed(1)),
        flowRate: parseFloat((300 + Math.random() * 20).toFixed(1)),
        networkLatency: Math.floor(10 + Math.random() * 5),
        fleet: this.data.fleet.map(caex => {
          if (caex.status === 'En Tránsito') {
            return { ...caex, speed: Math.floor(25 + Math.random() * 20) };
          }
          return caex;
        }),
        cyber: {
          ...this.data.cyber,
          blockedAttacksToday: this.data.cyber.blockedAttacksToday + (Math.random() > 0.6 ? 1 : 0)
        },
        esg: {
          ...this.data.esg,
          solarGenerationMW: parseFloat((44 + Math.random() * 4).toFixed(1))
        },
        csuite: {
          ...this.data.csuite,
          copperPriceLb: parseFloat((4.30 + Math.random() * 0.12).toFixed(2)),
          dailyProductionTons: this.data.csuite.dailyProductionTons + Math.floor(Math.random() * 3)
        }
      };

      this.listeners.forEach(callback => callback(this.data));
    }, 1500);
  }

  stopStream() {
    this.isLive = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getCurrentData() {
    return { ...this.data };
  }
}

export const telemetryService = new TelemetryService();
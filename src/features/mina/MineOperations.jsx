 import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

export const MineOperations = () => {
  const [telemetria, setTelemetria] = useState(null);

  useEffect(() => {
    const cargarTelemetria = async () => {
      const data = await apiService.obtenerTelemetriaIoT();
      setTelemetria(data);
    };

    cargarTelemetria();

    // Actualización automática en vivo cada 3 segundos (efecto SCADA)
    const interval = setInterval(cargarTelemetria, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!telemetria) {
    return (
      <div className="p-6 bg-slate-900 text-cyan-400 rounded-xl border border-cyan-500/20 animate-pulse">
        📡 Conectando con Sensores de Campo SCADA & Telemetría AHS...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-900 text-white rounded-xl">
      {/* Flota Autónoma */}
      <div className="p-4 bg-slate-800/80 rounded-lg border border-cyan-500/30 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-cyan-400">🚛 Flota Autónomos (AHS)</h3>
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
        </div>
        <p className="text-3xl font-extrabold text-white">{telemetria.flotaAutonoma?.camionesActivos} <span className="text-sm font-normal text-slate-400">Camiones</span></p>
        <p className="text-xs text-slate-400 mt-2">Velocidad Promedio: <strong className="text-slate-200">{telemetria.flotaAutonoma?.velocidadPromedioKmh} km/h</strong></p>
        <p className="text-xs text-slate-400">Tonelaje Turno: <strong className="text-slate-200">{telemetria.flotaAutonoma?.tonelajeTurnoActual?.toLocaleString()} Ton</strong></p>
      </div>

      {/* Molienda SAG */}
      <div className="p-4 bg-slate-800/80 rounded-lg border border-emerald-500/30 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-emerald-400">⚙️ Planta Molienda SAG</h3>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>
        <p className="text-3xl font-extrabold text-white">{telemetria.plantaMolienda?.presionMolinoSAG}</p>
        <p className="text-xs text-slate-400 mt-2">Temperatura Rodamientos: <strong className="text-slate-200">{telemetria.plantaMolienda?.temperaturaRodamientos}</strong></p>
        <p className="text-xs text-slate-400">Vibración Estructural: <strong className="text-slate-200">{telemetria.plantaMolienda?.vibracionEstructural}</strong></p>
      </div>

      {/* Radar de Taludes */}
      <div className="p-4 bg-slate-800/80 rounded-lg border border-amber-500/30 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-amber-400">📡 Radar Estabilidad Talud</h3>
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
        </div>
        <p className="text-3xl font-extrabold text-white">{telemetria.estabilidadTalud?.deformacionRadarMm} <span className="text-sm font-normal text-slate-400">mm</span></p>
        <p className="text-xs text-slate-400 mt-2">Factor de Seguridad: <strong className="text-emerald-400">{telemetria.estabilidadTalud?.estadoFactorSeguridad}</strong></p>
      </div>
    </div>
  );
};


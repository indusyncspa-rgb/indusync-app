// telemetryWebhook.controller.js
// Gateway Core - Ingesta masiva de webhooks de MIGPS y Drivetech de forma asíncrona

import { SafetyInterlockService } from './safetyInterlock.service';
import { DeadManSwitchService } from './deadManSwitch.service';

export class TelemetryWebhookController {
  constructor() {
    this.safetyService = new SafetyInterlockService();
    this.deadManService = new DeadManSwitchService();
  }

  // Endpoint principal para ingesta de telemetría masiva
  async handleTelemetryWebhook(req, res) {
    try {
      const payload = req.body;
      const tenantId = req.headers['x-tenant-id']; 

      // 1. Respuesta inmediata (ACK) para liberar la conexión del proveedor
      res.status(200).send({ status: 'ACK', message: 'Telemetry payload received' });

      // 2. Delegar el procesamiento asíncrono para no bloquear el Event Loop
      this.processTelemetryAsync(payload, tenantId).catch(err => {
        console.error('Fallo en procesamiento asíncrono de telemetría:', err);
      });

    } catch (error) {
      console.error('Error crítico en el Gateway de telemetría:', error);
      res.status(500).send({ status: 'ERROR' });
    }
  }

  // Procesamiento de reglas de negocio en background
  async processTelemetryAsync(payload, tenantId) {
    const event = {
      vehicle_id: payload.vehicle_id,
      speed_kmh: payload.speed,
      is_interlock_requested: payload.api_lock_command_active || false,
      is_armed: payload.telematics_armed_status || false
    };

    const interlockResult = this.safetyService.processTelemetry(event);
    
    const hardwareState = {
      hasCellularSignal: payload.gsm_signal > 0,
      mainPowerConnected: payload.power_voltage > 11.0,
      harnessConnected: !payload.tamper_alert,
      isEngineRunning: payload.ignition_status
    };
    
    const offlineResult = this.deadManService.handleOfflineTelemetry(payload, hardwareState);
    const sabotageResult = this.deadManService.evaluateSabotageProtection(hardwareState);

    console.log(
      `[Tenant: ${tenantId}] Vehículo: ${payload.vehicle_id} | Interlock: ${interlockResult?.status || 'OK'} | Sabotaje: ${sabotageResult?.status || 'CLEAR'}`
    );
  }
}
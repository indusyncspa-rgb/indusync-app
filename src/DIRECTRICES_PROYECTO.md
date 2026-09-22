# 🛡️ INDUSYNC Meta-OS — Directrices de Arquitectura & Visión Técnica v1.0

## 1. Módulos Construidos & Funcionalidad
- **Executive Dashboard (C-Suite):** Visión consolidada en tiempo real de EBITDA, Cash Cost C1, Throughput (tph) y estado de salud de planta.
- **Executive Pitch Deck (Directorio):** Presentación ejecutiva orientada a ROI financiero, payback en <4 meses y certificación SOX/ISO 55001.
- **Pitch Deck VPO (Vicepresidencia de Operaciones):** Enfoque técnico-operativo enfocado en bucle cerrado sub-20ms, control prescriptivo en Molinos SAG/Flotación e integración OPC-UA.
- **Marketplace B2B & MRO JIT:** Motor de licitaciones express integrables con SAP PM para despacho de repuestos críticos.

## 2. Estándares Técnicos Estrictos (SLA & OT)
- **Latencia Edge AI:** Inferencia local sub-20ms ejecutada On-Premise sin dependencia de latencia Cloud.
- **Protocolos OT Soporte:** Conexión nativa OPC-UA / Modbus TCP para DCS (Honeywell Experion, ABB Ability, Emerson DeltaV, Rockwell Automation).
- **Ciberseguridad:** Cumplimiento del Modelo Purdue Nivel 2/3 bajo estándar ISA/IEC 62443 mediante Unidirectional Data Diodes.
- **Resiliencia Subterránea / Campo:** Arquitectura PWA con sincronización local IndexedDB para operación 100% Off-Grid.

## 3. Reglas de Sintaxis JSX/React
- **Cadenas y Unidades de Medida:** Todo texto que incluya unidades o símbolos complejos (ej: `20ms`, `kWh/t`, `tph`) debe ir encerrado en comillas dobles/simples dentro del JSX o como texto plano directo para evitar que React lo interprete como variable de JS.
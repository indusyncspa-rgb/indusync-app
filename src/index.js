import fs from "fs";
import { IndusyncOPCClient } from "./src/opcClient.js";
import { MetaOSPublisher } from "./src/metaosPublisher.js";

async function run() {
  console.log("==================================================");
  console.log("   INDUSYNC MetaOS - OPC UA Industrial Edge V1    ");
  console.log("==================================================");

  // 1. Cargar Configuración de Tags Industriales
  const rawConfig = fs.readFileSync("./config/opcua-config.json");
  const config = JSON.parse(rawConfig);

  // 2. Inicializar Publicador hacia MetaOS Core
  const publisher = new MetaOSPublisher(
    process.env.INDUSYNC_API_KEY || "DEMO_KEY",
    process.env.METAOS_ENDPOINT || "https://api.indusync.cl"
  );

  // 3. Crear Cliente OPC UA y Conectar a Faena
  const opcClient = new IndusyncOPCClient(config, publisher);

  try {
    await opcClient.connect();
    await opcClient.startMonitoring();
  } catch (error) {
    console.error("❌ Error Crítico en el Conector OPC UA:", error);
    process.exit(1);
  }
}

run();
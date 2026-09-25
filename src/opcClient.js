import {
  OPCUAClient,
  AttributeIds,
  TimestampsToReturn,
  AttributeName
} from "node-opcua-client";

export class IndusyncOPCClient {
  constructor(config, publisher) {
    this.config = config;
    this.publisher = publisher;
    this.client = OPCUAClient.create({
      applicationName: config.clientName,
      connectionStrategy: {
        maxRetry: 10,
        initialDelay: 1000,
        maxDelay: 10000
      },
      securityMode: config.securityMode,
      securityPolicy: config.securityPolicy,
      endpointMustExist: false
    });
    this.session = null;
  }

  async connect() {
    console.log(`[OPC UA] 🔌 Conectando al Servidor Industrial: ${this.config.opcServerUrl}`);
    await this.client.connect(this.config.opcServerUrl);
    console.log("[OPC UA] ✅ Conexión establecida con la red de faena.");

    this.session = await this.client.createSession();
    console.log("[OPC UA] 🔑 Sesión segura de telemetría creada.");
  }

  async startMonitoring() {
    const subscription = await this.session.createSubscription2({
      requestedPublishingInterval: this.config.subscriptionInterval || 1000,
      requestedMaxKeepAliveCount: 20,
      requestedLifetimeCount: 100,
      maxNotificationsPerPublish: 1000,
      publishingEnabled: true,
      priority: 10
    });

    console.log("[OPC UA] ⏱️ Suscripción en tiempo real iniciada.");

    for (const node of this.config.nodesToMonitor) {
      const itemToMonitor = {
        nodeId: node.tagId,
        attributeId: AttributeIds.Value
      };

      const monitoredItem = await subscription.monitor(
        itemToMonitor,
        {
          samplingInterval: 500,
          discardOldest: true,
          queueSize: 10
        },
        TimestampsToReturn.Both
      );

      monitoredItem.on("changed", (dataValue) => {
        const payload = {
          equipment: node.equipment,
          metricName: node.metricName,
          unit: node.unit,
          value: dataValue.value.value,
          statusCode: dataValue.statusCode.name
        };

        this.publisher.sendTelemetry(payload);
      });

      console.log(`[OPC UA] 👁️ Monitoreando Tag Físico: ${node.tagId} (${node.equipment})`);
    }
  }
}
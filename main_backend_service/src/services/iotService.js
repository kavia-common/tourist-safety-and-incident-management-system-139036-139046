'use strict';
const iotModel = require('../models/iotModel');

// PUBLIC_INTERFACE
async function ingestIot({ deviceId, type, payload }) {
  /** Ingest IoT device data. Future: device authentication, stream processing, MQTT/Kafka. */
  return iotModel.ingest({ deviceId, type, payload });
}

// PUBLIC_INTERFACE
async function listIot({ deviceId, limit = 100 }) {
  /** List IoT events */
  return iotModel.list({ deviceId, limit });
}

module.exports = {
  ingestIot,
  listIot
};

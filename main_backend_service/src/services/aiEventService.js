'use strict';
const aiEventModel = require('../models/aiEventModel');

// PUBLIC_INTERFACE
async function ingestAiEvent({ source, type, payload }) {
  /** Ingest AI anomaly detection event. Future: trigger workflows, alerts, ML pipelines. */
  return aiEventModel.ingest({ source, type, payload });
}

// PUBLIC_INTERFACE
async function listAiEvents(limit = 100) {
  /** List recent AI events */
  return aiEventModel.list({ limit });
}

module.exports = {
  ingestAiEvent,
  listAiEvents
};

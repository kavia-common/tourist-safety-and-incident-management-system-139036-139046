'use strict';
const iotService = require('../services/iotService');

class IotController {
  // PUBLIC_INTERFACE
  async ingest(req, res, next) {
    /** Ingest IoT event. */
    try {
      const { deviceId, type, payload } = req.body || {};
      const record = await iotService.ingestIot({ deviceId, type, payload });
      res.status(201).json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async list(req, res, next) {
    /** List IoT events, optionally filter by deviceId. */
    try {
      const limit = parseInt(req.query.limit || '100', 10);
      const deviceId = req.query.deviceId || undefined;
      const items = await iotService.listIot({ deviceId, limit });
      res.json({ status: 'ok', items });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new IotController();

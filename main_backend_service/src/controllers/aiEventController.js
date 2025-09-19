'use strict';
const aiEventService = require('../services/aiEventService');

class AiEventController {
  // PUBLIC_INTERFACE
  async ingest(req, res, next) {
    /** Endpoint for AI systems to POST anomaly/event signals. */
    try {
      const { source, type, payload } = req.body || {};
      const record = await aiEventService.ingestAiEvent({ source, type, payload });
      res.status(201).json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async list(req, res, next) {
    /** Get recent AI events. */
    try {
      const limit = parseInt(req.query.limit || '100', 10);
      const items = await aiEventService.listAiEvents(limit);
      res.json({ status: 'ok', items });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AiEventController();

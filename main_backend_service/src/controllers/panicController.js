'use strict';
const panicService = require('../services/panicService');

class PanicController {
  // PUBLIC_INTERFACE
  async trigger(req, res, next) {
    /** Trigger a panic event. */
    try {
      const userId = req.user?.id;
      const { location, note } = req.body || {};
      const record = await panicService.triggerPanic({ userId, location, note });
      res.status(201).json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async list(req, res, next) {
    /** List recent panic events. */
    try {
      const limit = parseInt(req.query.limit || '50', 10);
      const items = await panicService.recentPanics(limit);
      res.json({ status: 'ok', items });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PanicController();

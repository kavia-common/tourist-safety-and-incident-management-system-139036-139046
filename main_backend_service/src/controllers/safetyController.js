'use strict';
const safetyService = require('../services/safetyService');

class SafetyController {
  // PUBLIC_INTERFACE
  async compute(req, res, next) {
    /** Compute or update safety score for the current user. */
    try {
      const userId = req.user?.id;
      const context = req.body || {};
      const record = await safetyService.updateSafetyScore({ userId, context });
      res.json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async get(req, res, next) {
    /** Get current user's safety score. */
    try {
      const userId = req.user?.id;
      const record = await safetyService.getSafetyScore(userId);
      res.json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SafetyController();

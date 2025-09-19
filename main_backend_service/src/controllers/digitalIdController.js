'use strict';
const digitalIdService = require('../services/digitalIdService');

class DigitalIdController {
  // PUBLIC_INTERFACE
  async create(req, res, next) {
    /** Create a digital ID for the authenticated user. */
    try {
      const userId = req.user?.id;
      const { fullName, passportNo, nationality, metadataHash } = req.body || {};
      const record = await digitalIdService.createDigitalId({ userId, fullName, passportNo, nationality, metadataHash });
      res.status(201).json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async verify(req, res, next) {
    /** Verify a digital ID using passport number and name. */
    try {
      const { passportNo, fullName } = req.body || {};
      const result = await digitalIdService.verifyDigitalId({ passportNo, fullName });
      res.json({ status: 'ok', ...result });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async myIds(req, res, next) {
    /** Get current user's digital IDs. */
    try {
      const userId = req.user?.id;
      const list = await digitalIdService.getUserDigitalIds(userId);
      res.json({ status: 'ok', items: list });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DigitalIdController();

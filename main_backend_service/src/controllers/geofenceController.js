'use strict';
const geofenceService = require('../services/geofenceService');

class GeofenceController {
  // PUBLIC_INTERFACE
  async create(req, res, next) {
    /** Create a geofence polygon for the current owner (user). */
    try {
      const ownerId = req.user?.id;
      const { name, polygon } = req.body || {};
      const record = await geofenceService.createGeofence({ ownerId, name, polygon });
      res.status(201).json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async list(req, res, next) {
    /** List geofences owned by current user. */
    try {
      const ownerId = req.user?.id;
      const items = await geofenceService.listGeofences(ownerId);
      res.json({ status: 'ok', items });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async event(req, res, next) {
    /** Record a geofence enter/exit event with location. */
    try {
      const userId = req.user?.id;
      const { geofenceId, eventType, location } = req.body || {};
      const record = await geofenceService.logGeofenceEvent({ userId, geofenceId, eventType, location });
      res.status(201).json({ status: 'ok', record });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GeofenceController();

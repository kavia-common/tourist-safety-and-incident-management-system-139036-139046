'use strict';
const geofenceModel = require('../models/geofenceModel');

// PUBLIC_INTERFACE
async function createGeofence({ ownerId, name, polygon }) {
  /** Create a geofence. Polygon expected as GeoJSON. */
  return geofenceModel.createGeofence({ ownerId, name, polygon });
}

// PUBLIC_INTERFACE
async function listGeofences(ownerId) {
  /** List geofences for owner */
  return geofenceModel.listGeofences(ownerId);
}

// PUBLIC_INTERFACE
async function logGeofenceEvent({ userId, geofenceId, eventType, location }) {
  /** Log a geofence enter/exit event */
  return geofenceModel.logEvent({ userId, geofenceId, eventType, location });
}

module.exports = {
  createGeofence,
  listGeofences,
  logGeofenceEvent
};

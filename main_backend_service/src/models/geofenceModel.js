'use strict';
const db = require('../db');

module.exports = {
  async createGeofence({ name, polygon, ownerId }) {
    const q = `
      INSERT INTO geofences (name, polygon, owner_id, created_at)
      VALUES ($1, ST_GeomFromGeoJSON($2), $3, NOW())
      RETURNING id, name, owner_id, created_at
    `;
    const params = [name, JSON.stringify(polygon), ownerId];
    const { rows } = await db.query(q, params);
    return rows[0];
  },
  async listGeofences(ownerId) {
    const q = 'SELECT id, name, owner_id, created_at FROM geofences WHERE owner_id=$1 ORDER BY created_at DESC';
    const { rows } = await db.query(q, [ownerId]);
    return rows;
  },
  async logEvent({ userId, geofenceId, eventType, location }) {
    const q = `
      INSERT INTO geofence_events (user_id, geofence_id, event_type, location, occurred_at)
      VALUES ($1,$2,$3, ST_SetSRID(ST_Point($4,$5), 4326), NOW())
      RETURNING id, user_id, geofence_id, event_type, occurred_at
    `;
    const params = [userId, geofenceId, eventType, location.lng, location.lat];
    const { rows } = await db.query(q, params);
    return rows[0];
  }
};

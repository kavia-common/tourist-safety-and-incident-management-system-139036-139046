'use strict';
const db = require('../db');

module.exports = {
  async ingest({ deviceId, type, payload }) {
    const q = `
      INSERT INTO iot_events (device_id, type, payload, created_at)
      VALUES ($1,$2,$3::jsonb, NOW())
      RETURNING id, device_id, type, created_at
    `;
    const { rows } = await db.query(q, [deviceId, type, JSON.stringify(payload || {})]);
    return rows[0];
  },
  async list({ deviceId, limit = 100 }) {
    let q = 'SELECT id, device_id, type, created_at FROM iot_events';
    const params = [];
    if (deviceId) {
      params.push(deviceId);
      q += ` WHERE device_id=$${params.length}`;
    }
    params.push(limit);
    q += ` ORDER BY created_at DESC LIMIT $${params.length}`;
    const { rows } = await db.query(q, params);
    return rows;
  }
};

'use strict';
const db = require('../db');

module.exports = {
  async createPanic({ userId, location, note }) {
    const q = `
      INSERT INTO panic_events (user_id, location, note, created_at)
      VALUES ($1, ST_SetSRID(ST_Point($2,$3), 4326), $4, NOW())
      RETURNING id, user_id, note, created_at
    `;
    const { rows } = await db.query(q, [userId, location.lng, location.lat, note || null]);
    return rows[0];
  },
  async listRecent(limit = 50) {
    const { rows } = await db.query('SELECT id, user_id, note, created_at FROM panic_events ORDER BY created_at DESC LIMIT $1', [limit]);
    return rows;
  }
};

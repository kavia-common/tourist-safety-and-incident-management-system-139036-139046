'use strict';
const db = require('../db');

module.exports = {
  async ingest({ source, type, payload }) {
    const q = `
      INSERT INTO ai_events (source, type, payload, created_at)
      VALUES ($1,$2,$3::jsonb, NOW())
      RETURNING id, source, type, created_at
    `;
    const { rows } = await db.query(q, [source, type, JSON.stringify(payload || {})]);
    return rows[0];
  },
  async list({ limit = 100 }) {
    const { rows } = await db.query('SELECT id, source, type, created_at FROM ai_events ORDER BY created_at DESC LIMIT $1', [limit]);
    return rows;
  }
};

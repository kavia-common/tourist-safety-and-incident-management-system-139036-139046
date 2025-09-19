'use strict';
const db = require('../db');

module.exports = {
  async upsertScore({ userId, score, factors }) {
    const q = `
      INSERT INTO safety_scores (user_id, score, factors, updated_at)
      VALUES ($1,$2,$3::jsonb, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET score=EXCLUDED.score, factors=EXCLUDED.factors, updated_at=NOW()
      RETURNING user_id, score, factors, updated_at
    `;
    const { rows } = await db.query(q, [userId, score, JSON.stringify(factors || {})]);
    return rows[0];
  },
  async getScore(userId) {
    const { rows } = await db.query('SELECT * FROM safety_scores WHERE user_id=$1', [userId]);
    return rows[0] || null;
  }
};

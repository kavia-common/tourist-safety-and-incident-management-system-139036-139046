'use strict';
const db = require('../db');

module.exports = {
  async getOverview() {
    const queries = [
      db.query('SELECT COUNT(*)::int AS total_users FROM users'),
      db.query('SELECT COUNT(*)::int AS total_digital_ids FROM digital_ids'),
      db.query('SELECT COUNT(*)::int AS total_panic FROM panic_events'),
      db.query('SELECT COUNT(*)::int AS total_ai_events FROM ai_events')
    ];
    const [u, d, p, a] = await Promise.all(queries);
    return {
      totalUsers: u.rows[0]?.total_users || 0,
      totalDigitalIds: d.rows[0]?.total_digital_ids || 0,
      totalPanicEvents: p.rows[0]?.total_panic || 0,
      totalAiEvents: a.rows[0]?.total_ai_events || 0
    };
  }
};

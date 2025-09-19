'use strict';
const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  ssl: config.db.ssl
});

// PUBLIC_INTERFACE
function query(text, params) {
  /** Execute a parameterized query against PostgreSQL. */
  return pool.query(text, params);
}

// PUBLIC_INTERFACE
async function health() {
  /** Simple DB health check */
  const res = await pool.query('SELECT 1 as ok');
  return res.rows[0]?.ok === 1;
}

module.exports = {
  pool,
  query,
  health
};

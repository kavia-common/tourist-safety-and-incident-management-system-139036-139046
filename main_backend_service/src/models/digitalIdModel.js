'use strict';
const db = require('../db');

module.exports = {
  async createDigitalId({ userId, fullName, passportNo, nationality, metadataHash }) {
    const q = `
      INSERT INTO digital_ids (user_id, full_name, passport_no, nationality, metadata_hash, created_at)
      VALUES ($1,$2,$3,$4,$5, NOW())
      RETURNING id, user_id, full_name, passport_no, nationality, metadata_hash, created_at
    `;
    const { rows } = await db.query(q, [userId, fullName, passportNo, nationality, metadataHash]);
    return rows[0];
  },
  async getById(id) {
    const { rows } = await db.query('SELECT * FROM digital_ids WHERE id=$1', [id]);
    return rows[0] || null;
  },
  async getByUser(userId) {
    const { rows } = await db.query('SELECT * FROM digital_ids WHERE user_id=$1 ORDER BY created_at DESC', [userId]);
    return rows;
  },
  async verifyByPassport(passportNo, fullName) {
    const q = 'SELECT * FROM digital_ids WHERE passport_no=$1 AND full_name ILIKE $2 ORDER BY created_at DESC LIMIT 1';
    const { rows } = await db.query(q, [passportNo, `%${fullName}%`]);
    return rows[0] || null;
  }
};

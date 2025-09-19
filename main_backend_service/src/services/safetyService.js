'use strict';
const safetyModel = require('../models/safetyModel');

// PUBLIC_INTERFACE
async function updateSafetyScore({ userId, context = {} }) {
  /** Compute a simple safety score. Future: plug AI weighting models here. */
  let score = 100;
  if (context.recentIncidents && context.recentIncidents > 0) {
    score -= Math.min(50, context.recentIncidents * 10);
  }
  if (context.nightTime) {
    score -= 10;
  }
  score = Math.max(0, Math.min(100, score));
  const record = await safetyModel.upsertScore({ userId, score, factors: context });
  return record;
}

// PUBLIC_INTERFACE
async function getSafetyScore(userId) {
  /** Get current safety score for a user */
  return safetyModel.getScore(userId);
}

module.exports = {
  updateSafetyScore,
  getSafetyScore
};

'use strict';
const panicModel = require('../models/panicModel');

// PUBLIC_INTERFACE
async function triggerPanic({ userId, location, note }) {
  /** Create a panic event. Future: push notifications/SMS integration here. */
  return panicModel.createPanic({ userId, location, note });
}

// PUBLIC_INTERFACE
async function recentPanics(limit = 50) {
  /** Recent panic events for dashboards */
  return panicModel.listRecent(limit);
}

module.exports = {
  triggerPanic,
  recentPanics
};

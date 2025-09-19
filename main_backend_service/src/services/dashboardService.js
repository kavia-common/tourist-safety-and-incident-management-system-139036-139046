'use strict';
const dashboardModel = require('../models/dashboardModel');

// PUBLIC_INTERFACE
async function overview() {
  /** Return basic overview stats for dashboard */
  return dashboardModel.getOverview();
}

module.exports = {
  overview
};

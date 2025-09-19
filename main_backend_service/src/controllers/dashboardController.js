'use strict';
const dashboardService = require('../services/dashboardService');

class DashboardController {
  // PUBLIC_INTERFACE
  async overview(req, res, next) {
    /** Dashboard overview metrics for authorities. */
    try {
      const data = await dashboardService.overview();
      res.json({ status: 'ok', data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new DashboardController();

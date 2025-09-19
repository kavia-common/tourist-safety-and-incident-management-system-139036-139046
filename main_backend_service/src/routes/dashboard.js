'use strict';
const express = require('express');
const controller = require('../controllers/dashboardController');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Dashboard
 *     description: Dashboards and feeds
 */

/**
 * @openapi
 * /api/dashboard/overview:
 *   get:
 *     summary: Overview metrics for authorities
 *     tags: [Dashboard]
 *     responses:
 *       200: { description: Overview data }
 */
router.get('/overview', controller.overview.bind(controller));

module.exports = router;

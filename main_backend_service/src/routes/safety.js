'use strict';
const express = require('express');
const controller = require('../controllers/safetyController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Safety
 *     description: Tourist safety scoring
 */

/**
 * @openapi
 * /api/safety/compute:
 *   post:
 *     summary: Compute or update my safety score
 *     tags: [Safety]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Contextual factors influencing safety
 *     responses:
 *       200: { description: Safety score updated }
 */
router.post('/compute', requireAuth, controller.compute.bind(controller));

/**
 * @openapi
 * /api/safety/me:
 *   get:
 *     summary: Get my safety score
 *     tags: [Safety]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current safety score }
 */
router.get('/me', requireAuth, controller.get.bind(controller));

module.exports = router;

'use strict';
const express = require('express');
const controller = require('../controllers/geofenceController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Geofence
 *     description: Geofencing and alerts
 */

/**
 * @openapi
 * /api/geofence:
 *   post:
 *     summary: Create a geofence
 *     tags: [Geofence]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, polygon]
 *             properties:
 *               name: { type: string }
 *               polygon: { type: object, description: "GeoJSON Polygon" }
 *     responses:
 *       201: { description: Created }
 */
router.post('/', requireAuth, controller.create.bind(controller));

/**
 * @openapi
 * /api/geofence:
 *   get:
 *     summary: List my geofences
 *     tags: [Geofence]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List geofences }
 */
router.get('/', requireAuth, controller.list.bind(controller));

/**
 * @openapi
 * /api/geofence/event:
 *   post:
 *     summary: Log a geofence event (enter/exit)
 *     tags: [Geofence]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [geofenceId, eventType, location]
 *             properties:
 *               geofenceId: { type: string }
 *               eventType: { type: string, enum: [enter, exit] }
 *               location:
 *                 type: object
 *                 properties:
 *                   lat: { type: number }
 *                   lng: { type: number }
 *     responses:
 *       201: { description: Event logged }
 */
router.post('/event', requireAuth, controller.event.bind(controller));

module.exports = router;

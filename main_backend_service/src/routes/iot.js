'use strict';
const express = require('express');
const controller = require('../controllers/iotController');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: IoT
 *     description: IoT ingest endpoints
 */

/**
 * @openapi
 * /api/iot/events:
 *   post:
 *     summary: Ingest an IoT device event
 *     tags: [IoT]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [deviceId, type, payload]
 *             properties:
 *               deviceId: { type: string }
 *               type: { type: string }
 *               payload: { type: object }
 *     responses:
 *       201: { description: Ingested }
 */
router.post('/events', controller.ingest.bind(controller));

/**
 * @openapi
 * /api/iot/events:
 *   get:
 *     summary: List IoT events
 *     tags: [IoT]
 *     parameters:
 *       - in: query
 *         name: deviceId
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of IoT events }
 */
router.get('/events', controller.list.bind(controller));

module.exports = router;

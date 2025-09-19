'use strict';
const express = require('express');
const controller = require('../controllers/aiEventController');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: AI
 *     description: AI anomaly detection events
 */

/**
 * @openapi
 * /api/ai/events:
 *   post:
 *     summary: Ingest an AI event
 *     tags: [AI]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [source, type, payload]
 *             properties:
 *               source: { type: string }
 *               type: { type: string }
 *               payload: { type: object }
 *     responses:
 *       201: { description: Ingested }
 */
router.post('/events', controller.ingest.bind(controller));

/**
 * @openapi
 * /api/ai/events:
 *   get:
 *     summary: List recent AI events
 *     tags: [AI]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: List of AI events }
 */
router.get('/events', controller.list.bind(controller));

module.exports = router;

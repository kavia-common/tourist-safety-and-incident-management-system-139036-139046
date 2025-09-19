'use strict';
const express = require('express');
const controller = require('../controllers/panicController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Panic
 *     description: Panic button actions
 */

/**
 * @openapi
 * /api/panic:
 *   post:
 *     summary: Trigger a panic event
 *     tags: [Panic]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note: { type: string }
 *               location:
 *                 type: object
 *                 properties:
 *                   lat: { type: number }
 *                   lng: { type: number }
 *     responses:
 *       201: { description: Panic created }
 */
router.post('/', requireAuth, controller.trigger.bind(controller));

/**
 * @openapi
 * /api/panic:
 *   get:
 *     summary: List recent panic events
 *     tags: [Panic]
 *     responses:
 *       200: { description: List of panic events }
 */
router.get('/', controller.list.bind(controller));

module.exports = router;

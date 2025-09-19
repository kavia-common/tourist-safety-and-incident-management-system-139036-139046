'use strict';
const express = require('express');
const controller = require('../controllers/digitalIdController');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: DigitalID
 *     description: Digital identity management
 */

/**
 * @openapi
 * /api/digital-id:
 *   post:
 *     summary: Create a digital ID
 *     tags: [DigitalID]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, passportNo, nationality, metadataHash]
 *             properties:
 *               fullName: { type: string }
 *               passportNo: { type: string }
 *               nationality: { type: string }
 *               metadataHash: { type: string, description: "Hash of PII/Document bundle; future blockchain anchor" }
 *     responses:
 *       201: { description: Created }
 */
router.post('/', requireAuth, controller.create.bind(controller));

/**
 * @openapi
 * /api/digital-id/verify:
 *   post:
 *     summary: Verify a digital ID by passport number and name
 *     tags: [DigitalID]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [passportNo, fullName]
 *             properties:
 *               passportNo: { type: string }
 *               fullName: { type: string }
 *     responses:
 *       200: { description: Verification result }
 */
router.post('/verify', controller.verify.bind(controller));

/**
 * @openapi
 * /api/digital-id/mine:
 *   get:
 *     summary: List my digital IDs
 *     tags: [DigitalID]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of digital IDs }
 */
router.get('/mine', requireAuth, controller.myIds.bind(controller));

module.exports = router;

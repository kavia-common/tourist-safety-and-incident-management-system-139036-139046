'use strict';
const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication via Supabase
 */

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user (server-side)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               metadata: { type: object }
 *     responses:
 *       201: { description: User created }
 */
router.post('/signup', controller.signup.bind(controller));

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Get current user from bearer token
 *     tags: [Auth]
 *     responses:
 *       200: { description: Current user info }
 *       401: { description: Unauthorized }
 */
router.get('/me', controller.me.bind(controller));

module.exports = router;

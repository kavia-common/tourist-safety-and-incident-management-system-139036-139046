'use strict';
const authService = require('../services/authService');

class AuthController {
  // PUBLIC_INTERFACE
  async signup(req, res, next) {
    /** Signup using Supabase (server-side). Expects {email, password, metadata}. */
    try {
      const { email, password, metadata } = req.body || {};
      const data = await authService.signup({ email, password, metadata: metadata || {} });
      res.status(201).json({ status: 'ok', user: data.user });
    } catch (e) {
      next(e);
    }
  }

  // PUBLIC_INTERFACE
  async me(req, res, next) {
    /** Return the current user based on bearer token. */
    try {
      const bearer = req.headers.authorization || '';
      const user = await authService.me(bearer);
      if (!user) return res.status(401).json({ status: 'error', message: req.t('unauthorized') });
      res.json({ status: 'ok', user });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();

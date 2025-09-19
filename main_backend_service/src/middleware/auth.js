'use strict';
const { verifyJwt } = require('../services/supabase');

// PUBLIC_INTERFACE
async function requireAuth(req, res, next) {
  /** Require a valid Supabase JWT in Authorization header. */
  try {
    const bearer = req.headers.authorization || '';
    const user = await verifyJwt(bearer);
    if (!user) {
      return res.status(401).json({ status: 'error', message: req.t('unauthorized') });
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  requireAuth
};

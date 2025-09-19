'use strict';
const { signupEmailPassword, verifyJwt } = require('./supabase');

// PUBLIC_INTERFACE
async function signup({ email, password, metadata }) {
  /** Create a user in Supabase Auth */
  return signupEmailPassword(email, password, metadata);
}

// PUBLIC_INTERFACE
async function me(bearer) {
  /** Get current user from Supabase token */
  return verifyJwt(bearer);
}

module.exports = {
  signup,
  me
};

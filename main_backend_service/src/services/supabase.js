'use strict';
const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

/**
 * Returns a Supabase client; uses service role key if present for server-side operations.
 * For user-specific flows (from frontend), rely on Authorization bearer from client SDK.
 */
function getSupabaseClient() {
  const key = config.supabase.serviceRoleKey || config.supabase.anonKey;
  if (!config.supabase.url || !key) {
    console.warn('[Supabase] URL or Key missing. Auth/storage operations will fail until configured.');
  }
  return createClient(config.supabase.url, key);
}

// PUBLIC_INTERFACE
async function signupEmailPassword(email, password, metadata = {}) {
  /** Sign up a new user in Supabase Auth with email/password. */
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: metadata,
    email_confirm: true
  });
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
async function verifyJwt(bearer) {
  /** Verifies a Supabase JWT using API method getUser() from token. */
  const token = (bearer || '').replace(/^Bearer\s+/i, '');
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return null;
  return data?.user || null;
}

module.exports = {
  getSupabaseClient,
  signupEmailPassword,
  verifyJwt
};

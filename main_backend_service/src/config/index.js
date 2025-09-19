'use strict';
/**
 * Centralized configuration loader using environment variables.
 * Note: Do not write .env here. Ensure env vars are provided by deployment.
 */
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10),

  // Database (main_database_service) - use variables provided by that container
  db: {
    host: process.env.POSTGRES_URL || 'localhost',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || 'postgres',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    ssl: (process.env.POSTGRES_SSL || 'false').toLowerCase() === 'true' ? { rejectUnauthorized: false } : false
  },

  // Supabase
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '' // prefer using service role on server for admin ops
  },

  jwt: {
    // Fallback secret for signing internal JWTs if needed (not for Supabase)
    secret: process.env.JWT_SECRET || 'change_me_in_env',
    expiresIn: process.env.JWT_EXPIRES_IN || '12h'
  },

  app: {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000'
  }
};

module.exports = config;

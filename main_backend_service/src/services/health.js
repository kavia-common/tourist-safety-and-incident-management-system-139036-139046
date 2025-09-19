const db = require('../db');

class HealthService {
  async getStatus() {
    const dbOk = await db.health().catch(() => false);
    return {
      status: dbOk ? 'ok' : 'degraded',
      message: 'Service is healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      dependencies: {
        database: dbOk ? 'up' : 'down'
      }
    };
  }
}

module.exports = new HealthService();

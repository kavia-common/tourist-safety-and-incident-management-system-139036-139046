const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tourist Safety & Incident Management API',
      version: '1.0.0',
      description: 'Express API for digital IDs, auth, safety scoring, geofencing, panic actions, AI & IoT ingest, and dashboards.'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Provide the Supabase access token as Bearer token'
        }
      }
    },
    tags: [
      { name: 'Health' },
      { name: 'Auth' },
      { name: 'DigitalID' },
      { name: 'Safety' },
      { name: 'Geofence' },
      { name: 'Panic' },
      { name: 'AI' },
      { name: 'IoT' },
      { name: 'Dashboard' }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;

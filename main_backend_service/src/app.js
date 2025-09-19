const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const { i18nMiddleware } = require('./i18n');

const v1Routes = require('./routes');

const authRoutes = require('./routes/auth');
const digitalIdRoutes = require('./routes/digitalId');
const safetyRoutes = require('./routes/safety');
const geofenceRoutes = require('./routes/geofence');
const panicRoutes = require('./routes/panic');
const aiRoutes = require('./routes/aiEvents');
const iotRoutes = require('./routes/iot');
const dashboardRoutes = require('./routes/dashboard');

// Initialize express app
const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language']
}));
app.set('trust proxy', true);

// Internationalization
app.use(i18nMiddleware);

// Swagger docs with dynamic server URL
app.use('/docs', swaggerUi.serve, (req, res, next) => {
  const host = req.get('host');
  let protocol = req.protocol;
  const actualPort = req.socket.localPort;
  const hasPort = host.includes(':');
  const needsPort =
    !hasPort &&
    ((protocol === 'http' && actualPort !== 80) ||
      (protocol === 'https' && actualPort !== 443));
  const fullHost = needsPort ? `${host}:${actualPort}` : host;
  protocol = req.secure ? 'https' : protocol;

  const dynamicSpec = {
    ...swaggerSpec,
    servers: [{ url: `${protocol}://${fullHost}` }]
  };
  swaggerUi.setup(dynamicSpec, { explorer: true })(req, res, next);
});

// Parse JSON request body
app.use(express.json());

// Root/health
app.use('/', v1Routes);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/digital-id', digitalIdRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/geofence', geofenceRoutes);
app.use('/api/panic', panicRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/iot', iotRoutes);
app.use('/api/dashboard', dashboardRoutes);

 // Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;

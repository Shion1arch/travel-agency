import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config, { getMissingConfig } from './config.js';
import authRoutes from './routes/auth.js';
import placesRoutes from './routes/places.js';
import servicesRoutes from './routes/services.js';
import contactsRoutes from './routes/contacts.js';
import adminRoutes from './routes/admin.js';

const app = express();
const allowedOrigins = new Set(config.corsOrigins);
const startupChecks = {
  config: {
    ok: false,
    message: 'Configuration has not been validated yet.'
  },
  database: {
    ok: false,
    message: 'Database connection has not been established yet.'
  }
};

const setStartupCheck = (name, ok, message = null) => {
  startupChecks[name] = {
    ok,
    message: ok ? null : message
  };
};

const isReady = () => Object.values(startupChecks).every((check) => check.ok);

const buildHealthPayload = () => ({
  status: isReady() ? 'ok' : 'degraded',
  checks: {
    config: startupChecks.config.ok ? 'ok' : 'failed',
    database: startupChecks.database.ok ? 'ok' : 'failed'
  },
  errors: Object.values(startupChecks)
    .filter((check) => !check.ok && check.message)
    .map((check) => check.message)
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'TADEV API running', status: isReady() ? 'ok' : 'degraded' }));
app.get('/api/health', (req, res) => {
  const payload = buildHealthPayload();
  res.status(isReady() ? 200 : 503).json(payload);
});

app.use('/api', (req, res, next) => {
  if (isReady()) {
    return next();
  }

  return res.status(503).json({
    message: 'Service is starting up or waiting for required configuration. Check /api/health for details.',
    ...buildHealthPayload()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connection.on('connected', () => {
  setStartupCheck('database', true);
  console.log('MongoDB connected');
});

mongoose.connection.on('disconnected', () => {
  setStartupCheck('database', false, 'MongoDB connection lost.');
  console.warn('MongoDB disconnected');
});

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
  } catch (error) {
    setStartupCheck('database', false, `Database connection failed: ${error.message}`);
    console.error('Failed to connect to MongoDB', error);
  }
};

const startServer = async () => {
  const server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  server.on('error', (error) => {
    console.error('Failed to start HTTP server', error);
    process.exit(1);
  });

  const missingConfig = getMissingConfig();
  if (missingConfig.length > 0) {
    setStartupCheck('config', false, `Missing required environment variables: ${missingConfig.join(', ')}`);
    setStartupCheck('database', false, 'Database connection skipped until required configuration is provided.');
    console.error(`Missing required environment variables: ${missingConfig.join(', ')}`);
    return;
  }

  setStartupCheck('config', true);
  await connectDatabase();
};

if (config.nodeEnv !== 'test') {
  startServer().catch((error) => {
    console.error('Failed to start backend', error);
    process.exit(1);
  });
}

export default app;

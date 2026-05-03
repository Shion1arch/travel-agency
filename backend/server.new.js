import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config, { validateConfig } from './config.js';
import authRoutes from './routes/auth.js';
import placesRoutes from './routes/places.js';
import servicesRoutes from './routes/services.js';
import contactsRoutes from './routes/contacts.js';
import adminRoutes from './routes/admin.js';

const app = express();
const allowedOrigins = new Set(config.corsOrigins);

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

app.use('/api/auth', authRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ message: 'TADEV API running' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const startServer = async () => {
  try {
    validateConfig();
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected');

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
};

if (config.nodeEnv !== 'test') {
  startServer();
}

export default app;

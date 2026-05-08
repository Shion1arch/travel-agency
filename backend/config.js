import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_PORT = 5000;
const DEFAULT_CORS_ORIGINS = ['http://localhost:3000'];

const parsePort = (value) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_PORT;
};

const parseCorsOrigins = (value) => {
  if (!value) return DEFAULT_CORS_ORIGINS;

  const origins = value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length ? origins : DEFAULT_CORS_ORIGINS;
};

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsePort(process.env.PORT),
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  corsOrigins: parseCorsOrigins(process.env.CORS_ORIGINS)
};

export const getMissingConfig = () => {
  const missing = [];

  if (!config.mongoUri) missing.push('MONGO_URI');
  if (!config.jwtSecret) missing.push('JWT_SECRET');

  return missing;
};

export const validateConfig = () => {
  const missing = getMissingConfig();

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

export default config;

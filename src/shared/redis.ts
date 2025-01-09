// import { createClient } from 'redis';
// import colors from 'colors';
// import { logger } from './logger';
// import config from '../config';

// let redisClient = createClient({ url: config.redis_url as string });

// redisClient.on('error', err => {
//   logger.error('Redis Client Error', err);
// });

// redisClient.on('connect', () => {
//   logger.info(colors.yellow(`✔ Redis Client connected to successfully`));
// });

// const connect = async (): Promise<void> => {
//   await redisClient.connect();
// };

// export const RedisClient = {
//   connect,
//   cacheResponse,
// };

import Redis from 'ioredis';
import { logger } from './logger';
import config from '../config';

// Initialize Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB || '0', 10),
});

// Event listeners for Redis
redisClient.on('connect', () => {
  logger.info('📡 Redis connecting...');
});

redisClient.on('ready', () => {
  logger.info('🔴 Redis client is ready to use');
});

redisClient.on('error', (err: Error) => {
  logger.error('Redis error:', err);
});

redisClient.on('close', () => {
  logger.warn('Redis connection closed');
});

redisClient.on('reconnecting', () => {
  logger.info('Reconnecting to Redis...');
});

export const connectRedis = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    redisClient.once('ready', () => {
      logger.info('🚀 Redis connected successfully 🚀');
      resolve();
    });

    redisClient.once('error', (err: Error) => {
      logger.error('❌ Redis connection error during startup:', err);
      reject(err);
    });
  });
};

export default redisClient;

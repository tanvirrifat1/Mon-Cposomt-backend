import { logger } from './logger';
import redisClient from './redis';

export const getCacheKeys = async (): Promise<string[]> => {
  try {
    // WARNING: The KEYS command can be slow on large datasets. Use SCAN for production.
    const keys = await redisClient.keys('*');
    logger.info(`Cache Keys: ${keys}`);
    return keys;
  } catch (error) {
    logger.error('Error fetching cache keys:', error);
    return [];
  }
};

export const getCache = async (key: string): Promise<any> => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      const parsedata = JSON.parse(data);
      return parsedata;
    }
    return null;
  } catch (error) {
    logger.error(`Error getting cache for key "${key}":`, error);
    return null;
  }
};

export const setCache = async (
  key: string,
  value: any,
  ttl?: number
): Promise<boolean> => {
  try {
    //   console.log(value,"------------->")
    const stringValue = JSON.stringify(value);
    if (ttl) {
      //   await redisClient.set(key, stringValue, 'EX', ttl);
      await redisClient.set(key, stringValue, 'EX', ttl);
    } else {
      await redisClient.set(key, stringValue);
    }
    return true;
  } catch (error) {
    logger.error(`Error setting cache for key "${key}":`, error);
    return false;
  }
};

export const delCache = async (key: string): Promise<number> => {
  try {
    const result = await redisClient.del(key);
    return result;
  } catch (error) {
    logger.error(`Error deleting cache for key "${key}":`, error);
    return 0;
  }
};

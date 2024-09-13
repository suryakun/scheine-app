import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const API_KEY = process.env.API_KEY || 'your-random-api-key-here';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('X-Api-Key');

  logger.info(`API Key: ${apiKey} - SYSTEM KEY: ${API_KEY}`);
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  next();
};

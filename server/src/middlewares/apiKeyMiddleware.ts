import { Request, Response, NextFunction } from 'express';

const API_KEY = process.env.API_KEY || 'your-random-api-key-here';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('X-API-Key');

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }

  next();
};

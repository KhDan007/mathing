import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';

const { SECRET_KEY } = config;

declare module 'express' {
  interface Request {
    userId: number;
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    req.userId = decoded.userId; // This is now properly typed
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};
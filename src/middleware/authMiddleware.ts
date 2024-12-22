import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(new Error('No token, authorization denied'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string };

    if (decoded.role !== 'admin') {
      return next(new Error('Access denied'));
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    next(new Error('Token is not valid'));
  }
};
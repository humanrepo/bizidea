import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { createError } from '../utils/error.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw createError(401, 'Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      throw createError(401, 'Invalid token.');
    }

    req.user = { userId: user.id, ...user.toJSON() };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(createError(401, 'Invalid token.'));
    } else if (error.name === 'TokenExpiredError') {
      next(createError(401, 'Token expired.'));
    } else {
      next(error);
    }
  }
};

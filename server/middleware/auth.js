import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ status: false, message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Invalid token' });
  }
};

export const requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ status: false, message: 'Unauthorized' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ status: false, message: 'Forbidden' });
  next();
};

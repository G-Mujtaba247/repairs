import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ status: false, message: 'Missing required fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ status: false, message: 'Email already registered' });
    const user = await User.create({ name, email, password, role, phone });
    const token = signToken(user);
    return res.json({ status: true, user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: false, message: 'Missing credentials' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ status: false, message: 'Invalid credentials' });
    const token = signToken(user);
    return res.json({ status: true, user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
}

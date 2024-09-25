// src/pages/api/protected.js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.status(200).json({ message: 'Protected data', user: decoded });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

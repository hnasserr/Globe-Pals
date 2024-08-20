import jwt from 'jsonwebtoken';
import 'dotenv/config'


export const authorize = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded token (user id) to the request object
    next();  // Continue to the next middleware or route handler
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

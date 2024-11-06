// backend/middleware/authenticateJWT.js
const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const jwtSecret = key.jwtSecretKey;

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expect "Bearer token"
  if (!token) return res.status(401).json({ ok:false , msg: 'Invalid token!' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ ok:false , msg: 'Invalid token!' });
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Continue to the next middleware/route handler
  });
};

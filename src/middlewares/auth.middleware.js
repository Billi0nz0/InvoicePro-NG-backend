require('dotenv').config();
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // Check if the request has an Authorization header with a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (e.g., "Bearer <token>" -> "<token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's ID to the request so the next function knows who they are
      req.user = decoded;
      
      // Allow them to proceed
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

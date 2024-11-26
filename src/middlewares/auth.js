const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (request, h) => {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return h.response({ error: 'Token required' }).code(401).takeover();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.pre = { auth: decoded }; // Attach user info to request
      return h.continue;
    } catch (err) {
      return h.response({ error: 'Invalid token' }).code(403).takeover();
    }
  },
};

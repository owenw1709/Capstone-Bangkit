const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }),
  validateToken: (token) => jwt.verify(token, process.env.JWT_SECRET),
};

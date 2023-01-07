const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id, timeExpiresIn) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: timeExpiresIn,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
module.exports = { generateToken, verifyToken };

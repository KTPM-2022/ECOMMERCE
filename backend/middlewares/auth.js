const { verifyToken } = require('../helpers/jwt');

function protect(req, res, next) {
  if (req.cookies.token) {
    const decoded = verifyToken(req.cookies.token);
    req.auth = decoded.id;
    next();
  }
}

module.exports = { protect };

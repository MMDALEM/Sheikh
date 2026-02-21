const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/httpRes');

const checkToken = (req, res, next) => {
  let authorizationHeader = null;
  let authorizationType = null;
  let jwtVerifySignature = null;
  if (req.headers['x-token-user']) {
    authorizationHeader = req.headers['x-token-user'];
    authorizationType = 'user';
    jwtVerifySignature = process.env.JWT_ACCESS_TOKEN_SECRET_USER;
  } else
    return sendError(res, 401, "Unauthorized");
  const token = authorizationHeader;
  if (!token) {
    return sendError(res, 401, "Unauthorized");
  } else {
    jwt.verify(token, jwtVerifySignature, async (err, user) => {
      if (err) {
        return sendError(res, 403, err.message);
      } else {
        req.systemUser = user;
        req.systemUserType = (authorizationType) ? authorizationType.toUpperCase() : user.role;
        next();
      }
    });
  }
};

module.exports = checkToken;

const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/httpRes');
const userModel = require('../models/user.model');

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

const checkValidateToken = async (req, res, next) => {
  const token = req.headers['x-token-user'];
  if (!token) {
    return sendError(res, 401, "Unauthorized");
  } else {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_USER, async (err, user) => {
      if (err) return sendError(res, 403, err.message);
      else {
        const users = await userModel.findOne({ hashIdAuth: user.hashIdAuth }, { password: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        if (!users) {
          return sendError(res, 404, "کاربر یافت نشد");
        } else {
          return res.status(200).json({ status: "success", message: "توکن معتبر است", data: { user: users } });
        }
      }
    });
  }
};

module.exports = { checkToken, checkValidateToken };

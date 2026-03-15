const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/httpRes');
const userModel = require('../models/user.model');

const checkToken = (req, res, next) => {
  const rawHeader = req.headers['x-token-user'];

  if (!rawHeader) {
    return sendError(res, 401, "Unauthorized");
  }

  // پشتیبانی از هر دو فرمت: مستقیم یا "Bearer <token>"
  const token = rawHeader.startsWith('Bearer ')
    ? rawHeader.split(' ')[1]
    : rawHeader;

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_USER, (err, user) => {
    if (err) {
      return sendError(res, 403, "توکن نامعتبر یا منقضی شده است");
    }
    req.systemUser = user;
    req.systemUserType = 'USER';
    next();
  });
};

const checkValidateToken = async (req, res, next) => {
  const rawHeader = req.headers['x-token-user'];

  if (!rawHeader) {
    return sendError(res, 401, "Unauthorized");
  }

  const token = rawHeader.startsWith('Bearer ')
    ? rawHeader.split(' ')[1]
    : rawHeader;

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_USER, async (err, user) => {
    if (err) {
      return sendError(res, 403, "توکن نامعتبر یا منقضی شده است");
    }

    try {
      const foundUser = await userModel.findOne(
        { hashIdAuth: user.hashIdAuth },
        { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
      );

      if (!foundUser) {
        return sendError(res, 404, "کاربر یافت نشد");
      }

      return res.status(200).json({
        status: "success",
        message: "توکن معتبر است",
        data: { user: foundUser }
      });
    } catch (dbErr) {
      return sendError(res, 500, "خطای سرور");
    }
  });
};

module.exports = { checkToken, checkValidateToken };
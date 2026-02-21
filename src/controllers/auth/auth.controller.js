const controller = require('../contoller');
const randomstring = require("randomstring");
const userModel = require('../../models/user.model');
const { compareString, hashString, SignAccessToken } = require('../../utils/function');
const md5 = require("md5");
const { sendError, sendSuccess } = require('../../utils/httpRes');

class authController extends controller {

  async create(req, res, next) {
    try {

      const phone = req.body?.phone;

      const user = await userModel.findOne({ phone }).exec();
      if (user) return sendError(res, 401, "موبایل وارد شده وجود دارد");

      // ------- HASH ID ------- //
      const hashIdPublicSalt = randomstring.generate(128);
      const hashIdPublicString = `user-id-${phone}-${hashIdPublicSalt}-${Date.now()}`;
      const hashIdPublic = md5(hashIdPublicString);

      // ------- HASH AUHT ------- //
      const hashIdAuthSalt = randomstring.generate(512);
      const hashIdAuthString = `user-auth-${phone}-${hashIdAuthSalt}-${Date.now()}`;
      const hashIdAuth = md5(hashIdAuthString);

      // ------- PASSWORD ------- //
      let password = null;
      if (req.body.password) password = await hashString(req.body.password);
      if (!password) return sendError(res, 401, "رمز عبور وارد نشده است");

      const newUser = new userModel({
        username: req.body.username,
        password,
        phone: req.body.phone,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hashIdPublic: hashIdPublic,
        hashIdAuth: hashIdAuth,
      });

      const resualt = await newUser.save();
      const accessToken = await SignAccessToken(hashIdAuth);

      return sendSuccess(res, 201, "ثبت نام با موفقیت انجام شد",
        {
          firstName: resualt.firstName,
          lastName: resualt.lastName,
          phone: resualt.phone,
          accessToken: accessToken,
        });
    } catch (err) {
      if (err.code == 11000)
        throw sendError(res, 404, "این نام کاربری قبلا ثبت نام کرده است");
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      let { username, password } = req.body;

      const item = await userModel.findOne({ username, isActive: true }).exec();

      if (item) {
        const checkPassword = await compareString(password, item.password);
        if (checkPassword) {
          const accessToken = await SignAccessToken(item.hashIdAuth);

          return sendSuccess(res, 200, "ورود با موفقیت انجام شد", {
            phone: item.phone,
            accessToken: accessToken,
          });

        } else sendError(res, 401, "رمز عبور وارد شده اشتباه است");
      } else sendError(res, 401, "کاربر مورد نظر وجود ندارد");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new authController();
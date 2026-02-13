const JWT = require("jsonwebtoken");
const argon2 = require("argon2");
const randomstring = require("randomstring");
const createError = require('http-errors');

async function hashString(string) {
  return argon2.hash(string, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
}

async function compareString(string, hash) {
  return argon2.verify(hash, string);
}

function SignAccessToken(hashIdAuth) {
  return new Promise(async (resolve, reject) => {
    const payload = {
      hashIdAuth: hashIdAuth,
    };
    const options = {
      expiresIn: '60d',
    };
    JWT.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_USER, options, (err, token) => {
      if (err) reject(createError.Unauthorized('خطای در اعتبار سنجی'));
      resolve(token);
    });
  });
}

function randomCode() {
  return Math.floor(Math.random() * 90000 + 10000);
}

async function isValidMongoId(id) {
  if (!id) return false;
  if (id.length !== 24) return false;
  const hexRegex = /^[0-9a-fA-F]{24}$/;
  if (hexRegex.test(id)) return true;
  return false;
}

function RandomString() {
  return randomstring.generate({ length: 25 });
}

module.exports = {
  SignAccessToken,
  hashString,
  compareString,
  isValidMongoId,
  randomCode,
  RandomString,
};
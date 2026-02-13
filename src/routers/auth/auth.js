const router = require('express').Router();

//****controllers****
const authController = require('../../controllers/auth/auth.controller');

//****auth****
router.post('/', authController.create);
router.post('/login', authController.login);

module.exports = { authRouter: router };

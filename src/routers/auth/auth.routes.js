const router = require('express').Router();

//****controllers****
const authController = require('../../controllers/auth/auth.controller');
const { checkValidateToken } = require('../../middlewares/checkToken');

//****auth****
router.post('/', authController.create);
router.post('/login', authController.login);
router.get('/validate', checkValidateToken);

module.exports = { authRouter: router };

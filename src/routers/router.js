const router = require('express').Router();

//**********router api***********/
const { apiRouter } = require('./api/api');
router.use('/api/', apiRouter);

//**********router auth***********/
const { authRouter } = require('./auth/auth');
router.use('/api/auth', authRouter);

module.exports = { AllRouters: router };
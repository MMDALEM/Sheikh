const router = require('express').Router();
const checkToken = require('../middlewares/checkToken');

//**********router auth***********/
const { authRouter } = require('./auth/auth.routes');
router.use('/api/auth', authRouter);

//**********router api***********/
const { apiRouter } = require('./api/api.routes');
router.use('/api/', checkToken, apiRouter);

//**********router allCost***********/
const { allCostRouter } = require('./api/allCost.routes');
router.use('/api/allcost', checkToken, allCostRouter);

//**********router assist***********/
const { assistRouter } = require('./api/assist.routes');
router.use('/api/assist', checkToken, assistRouter);

//**********router customer***********/
const { customerRouter } = require('./api/customer.routes');
router.use('/api/customer', checkToken, customerRouter);

//**********router doctor***********/
const { doctorRouter } = require('./api/doctor.routes');
router.use('/api/doctor', checkToken, doctorRouter);

//**********router hospital***********/
const { hospitalRouter } = require('./api/hospital.routes');
router.use('/api/hospital', checkToken, hospitalRouter);

//**********router initialcost***********/
const { initialCostRouter } = require('./api/initialCost.routes');
router.use('/api/initialcost', checkToken, initialCostRouter);

//**********router reagent***********/
const { reagentRouter } = require('./api/reagent.routes');
router.use('/api/reagent', checkToken, reagentRouter);

//**********router sharedCost***********/
const { sharedCostRouter } = require('./api/sharedCost.routes');
router.use('/api/sharedcost', checkToken, sharedCostRouter);

//**********router surgery***********/
const { surgeryRouter } = require('./api/surgery.routes');
router.use('/api/surgery', checkToken, surgeryRouter);

module.exports = { AllRouters: router };
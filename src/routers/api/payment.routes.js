const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/api/payment.controller');
const { checkToken } = require('../../middlewares/checkToken');

router.post('/', checkToken, ctrl.create);
router.get('/', checkToken, ctrl.list);
router.get('/:id', checkToken, ctrl.findOne);
router.put('/:id', checkToken, ctrl.update);
router.delete('/:id', checkToken, ctrl.delete);

module.exports = { paymentRouter: router };
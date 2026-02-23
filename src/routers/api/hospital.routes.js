const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/api/hospital.controller");

router.get("/special-list", ctrl.specialList);
router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.put("/:id", ctrl.update);
router.get("/:id", ctrl.findOne);
router.delete("/:id", ctrl.delete);

module.exports = { hospitalRouter: router };

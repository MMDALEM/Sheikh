const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/api/initialCost.controller");

router.get("/special-list", ctrl.specialList);
router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.get("/:id", ctrl.findOne);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);

module.exports = { initialCostRouter: router };

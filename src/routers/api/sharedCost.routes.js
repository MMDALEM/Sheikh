const express = require("express");
const sharedCostController = require("../../controllers/api/sharedCost.controller");
const router = express.Router();

router.get("/special-list", sharedCostController.specialList);
router.post("/", sharedCostController.create);
router.get("/", sharedCostController.list);
router.get("/:id", sharedCostController.findOne);
router.put("/:id", sharedCostController.update);
router.delete("/:id", sharedCostController.remove);

module.exports = { sharedCostRouter: router };
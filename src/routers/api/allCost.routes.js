const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/api/allCost.controller");

// Category CRUD
router.get("/special-list", ctrl.specialList);
router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.get("/:id", ctrl.findOne);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);

// Entry (specialAdd) routes
router.patch("/entry", ctrl.listEntries);
router.post("/entry", ctrl.specialAdd);
router.put("/entry/:id", ctrl.updateEntry);
router.delete("/entry/:id", ctrl.deleteEntry);

module.exports = { allCostRouter: router };

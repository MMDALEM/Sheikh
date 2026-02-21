const express = require("express");

/**
 * Creates a router with standard CRUD endpoints + optional specialList.
 * @param {object} controller - must have create, list, update, delete methods
 * @param {function} [specialListHandler] - optional specialList handler
 */
function createCrudRoutes(controller, specialListHandler) {
  const router = express.Router();

  router.post("/", controller.create);
  router.get("/", controller.list);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  if (specialListHandler) {
    router.get("/special-list", specialListHandler);
  }

  return router;
}

module.exports = createCrudRoutes;

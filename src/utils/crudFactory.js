function createCrudController(Model) {
  return {
    // CREATE
    async create(req, res, next) {
      try {
        const doc = await Model.create({ name: req.body.name });
        res.status(201).json({ status: "success", data: doc });
      } catch (err) {
        next(err);
      }
    },

    // LIST
    async list(req, res, next) {
      try {
        const docs = await Model.find().sort({ createdAt: -1 });
        res.json({ status: "success", data: docs });
      } catch (err) {
        next(err);
      }
    },

    // FINDONE
    async findOne(req, res, next) {
      try {
        const doc = await Model.findById(req.params.id);
        if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
        res.json({ status: "success", data: doc });
      } catch (err) {
        next(err);
      }
    },

    // UPDATE
    async update(req, res, next) {
      try {
        const doc = await Model.findByIdAndUpdate(req.params.id, { name: req.body.name });
        if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
        res.json({ status: "success", data: doc });
      } catch (err) {
        next(err);
      }
    },

    // DELETE
    async delete(req, res, next) {
      try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
        return res.json({ status: "success", message: "Deleted" });
      } catch (err) {
        next(err);
      }
    },
  };
}

module.exports = createCrudController;

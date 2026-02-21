const Reagent = require("../../models/reagent.model");
const Customer = require("../../models/customer.model");
const createCrudController = require("../../utils/crudFactory");
const { buildDateFilter } = require("../../utils/dateFilter");

const crud = createCrudController(Reagent);

async function specialList(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query);

    const result = await Customer.aggregate([
      { $match: dateFilter },
      { $match: { "reagent.reagentId": { $exists: true, $ne: null } } },
      {
        $group: {
          _id: "$reagent.reagentId",
          totalPrice: { $sum: "$reagent.price" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "reagents",
          localField: "_id",
          foreignField: "_id",
          as: "info",
        },
      },
      { $unwind: "$info" },
      {
        $project: {
          _id: 1,
          name: "$info.name",
          totalPrice: 1,
          count: 1,
        },
      },
      { $sort: { totalPrice: -1 } },
    ]);

    const grandTotal = result.reduce((sum, r) => sum + r.totalPrice, 0);

    res.json({ success: true, data: result, grandTotal });
  } catch (err) {
    next(err);
  }
}

module.exports = { ...crud, specialList };

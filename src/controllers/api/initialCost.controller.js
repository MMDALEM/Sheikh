const InitialCost = require("../../models/initialcosts.model");
const Customer = require("../../models/customer.model");
const createCrudController = require("../../utils/crudFactory");
const { buildDateFilter } = require("../../utils/dateFilter");


const crud = createCrudController(InitialCost);

// specialList: unwind initialCosts array, group by initialPriceId, sum prices
async function specialList(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query);

    const result = await Customer.aggregate([
      { $match: dateFilter },
      { $unwind: "$initialCosts" },
      {
        $group: {
          _id: "$initialCosts.initialPriceId",
          totalPrice: { $sum: "$initialCosts.price" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "initialcosts",
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

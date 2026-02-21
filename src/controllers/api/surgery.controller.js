const Surgery = require("../../models/surgery.model");
const Customer = require("../../models/customer.model");
const createCrudController = require("../../utils/crudFactory");
const { buildDateFilter } = require("../../utils/dateFilter");

const crud = createCrudController(Surgery);

// specialList: group customers by surgery, sum prices, with date filter
async function specialList(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query);

    const result = await Customer.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$surgery.surgeryId",
          totalPrice: { $sum: "$surgery.price" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "surgeries",
          localField: "_id",
          foreignField: "_id",
          as: "surgeryInfo",
        },
      },
      { $unwind: "$surgeryInfo" },
      {
        $project: {
          _id: 1,
          name: "$surgeryInfo.name",
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

// Override list to support date filter based on customer date
async function list(req, res, next) {
  try {
    const { fromDate, toDate } = req.query;

    if (fromDate || toDate) {
      const dateFilter = buildDateFilter(req.query);
      const customers = await Customer.find(dateFilter).populate("surgery.surgeryId");
      const surgeryIds = [...new Set(customers.map((c) => c.surgery.surgeryId?.toString()).filter(Boolean))];
      const surgeries = await Surgery.find({ _id: { $in: surgeryIds } });
      return res.json({ success: true, data: surgeries });
    }

    const docs = await Surgery.find().sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (err) {
    next(err);
  }
}

module.exports = { ...crud, list, specialList };

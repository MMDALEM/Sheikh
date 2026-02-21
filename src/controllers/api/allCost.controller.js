
// const allCostModel = require("../../models/AllCost.model");
const allCostModel = require("../../models/AllCost.model");
const AllCostEntry = require("../../models/allcostentry.model");
const createCrudController = require("../../utils/crudFactory");
const { buildDateFilter } = require("../../utils/dateFilter");

const crud = createCrudController(allCostModel);

// specialAdd: create an entry for a specific allCost category
async function specialAdd(req, res, next) {
  try {
    const { allCostId, price, date } = req.body;
    const entry = await AllCostEntry.create({ allCostId, price, date });
    return res.status(201).json({ status: "success", data: entry });
  } catch (err) {
    next(err);
  }
}

// specialList: group allCostEntries by allCostId, sum prices, with date filter
async function specialList(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query, "date");

    const result = await AllCostEntry.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$allCostId",
          totalPrice: { $sum: "$price" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "allcosts",
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

    return res.json({ status: "success", data: result, grandTotal });
  } catch (err) {
    next(err);
  }
}

// List all entries (optionally filtered by allCostId)
async function listEntries(req, res, next) {
  try {
    const filter = {};
    if (req.query.allCostId) filter.allCostId = req.query.allCostId;

    const dateFilter = buildDateFilter(req.query, "date");
    Object.assign(filter, dateFilter);

    const entries = await AllCostEntry.find(filter).populate("allCostId").sort({ createdAt: -1 });
    return res.json({ status: "success", data: entries });
  } catch (err) {
    next(err);
  }
}

// Update an entry
async function updateEntry(req, res, next) {
  try {
    console.log(req.params.id)
    const entry = await AllCostEntry.findByIdAndUpdate(req.params.id, req.body);
    if (!entry) return res.status(404).json({ status: "failed", message: "Not found" });
    return res.json({ status: "success", data: entry });
  } catch (err) {
    next(err);
  }
}

// Delete an entry
async function deleteEntry(req, res, next) {
  try {
    const entry = await AllCostEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ status: "failed", message: "Not found" });
    return res.json({ status: "success", message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { ...crud, specialAdd, specialList, listEntries, updateEntry, deleteEntry };

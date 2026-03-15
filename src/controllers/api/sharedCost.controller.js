const SharedCost = require("../../models/sharedcosts.model");
const Customer = require("../../models/customer.model");
const { buildDateFilter } = require("../../utils/dateFilter");

async function specialList(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query);

    const result = await Customer.aggregate([
      { $match: dateFilter },
      { $unwind: "$sharedCosts" },
      {
        $group: {
          _id: "$sharedCosts.sharedId",
          totalPrice: { $sum: "$sharedCosts.price" },
          count: { $sum: 1 },
          details: {
            $push: {
              date: "$sharedCosts.date",
              price: "$sharedCosts.price",
              customerDate: "$date",
              patientName: "$patientName",
            },
          },
        },
      },
      {
        $lookup: {
          from: "sharedcosts",
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
          details: 1,
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

async function create(req, res, next) {
  try {
    const doc = await SharedCost.create({
      name: req.body.name,
      price: req.body.price,
      date: req.body.date,
    });
    res.status(201).json({ status: "success", data: doc });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.price !== undefined) updateData.price = req.body.price;
    if (req.body.date !== undefined) updateData.date = req.body.date;

    const doc = await SharedCost.findByIdAndUpdate(
      req.params.id,
      updateData,
    );
    if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
    res.json({ status: "success", data: doc });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const docs = await SharedCost.find().sort({ createdAt: -1 });
    res.json({ status: "success", data: docs });
  } catch (err) {
    next(err);
  }
}

async function findOne(req, res, next) {
  try {
    const doc = await SharedCost.findById(req.params.id);
    if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
    res.json({ status: "success", data: doc });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const doc = await SharedCost.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
    return res.json({ status: "success", message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { specialList, create, update, list, findOne, remove };

const Doctor = require("../../models/doctor.model");
const Customer = require("../../models/customer.model");
const createCrudController = require("../../utils/crudFactory");
const { buildDateFilter } = require("../../utils/dateFilter");

const crud = createCrudController(Doctor);

// specialList: group customers by doctor, sum doctor price (share), with date filter
async function specialList(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query);

    const result = await Customer.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$doctor.doctorId",
          totalPrice: { $sum: "$doctor.price" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "_id",
          as: "doctorInfo",
        },
      },
      { $unwind: "$doctorInfo" },
      {
        $project: {
          _id: 1,
          name: "$doctorInfo.name",
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

// list with date filter - sums doctor share (price)
async function list(req, res, next) {
  try {
    const { fromDate, toDate } = req.query;

    if (fromDate || toDate) {
      const dateFilter = buildDateFilter(req.query);

      const result = await Customer.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$doctor.doctorId",
            totalPrice: { $sum: "$doctor.price" },
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "_id",
            foreignField: "_id",
            as: "doctorInfo",
          },
        },
        { $unwind: "$doctorInfo" },
        {
          $project: {
            _id: 1,
            name: "$doctorInfo.name",
            totalPrice: 1,
            count: 1,
          },
        },
      ]);

      const grandTotal = result.reduce((sum, r) => sum + r.totalPrice, 0);
      return res.json({ success: true, data: result, grandTotal });
    }

    const docs = await Doctor.find().sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (err) {
    next(err);
  }
}

module.exports = { ...crud, list, specialList };

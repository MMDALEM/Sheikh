const Doctor = require("../../models/doctor.model");
const createCrudController = require("../../utils/crudFactory");
const { buildDateFilter } = require("../../utils/dateFilter");
const Customer = require("../../models/customer.model");

const crud = createCrudController(Doctor);

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

async function list(req, res, next) {
  try {
    const { fromDate, toDate, page, limit } = req.query;
    const currentPage = parseInt(page) || 1;
    const currentLimit = parseInt(limit) || 10;

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
        { $skip: (currentPage - 1) * currentLimit },
        { $limit: currentLimit },
      ]);

      const grandTotal = result.reduce((sum, r) => sum + r.totalPrice, 0);
      return res.json({
        success: true,
        data: { docs: result },
        grandTotal,
        pagination: {
          page: currentPage,
          limit: currentLimit,
        },
      });
    }

    const docs =
      await Doctor.paginate(
        {},
        {
          page: currentPage,
          limit: currentLimit,
          sort: { createdAt: -1 },
        }
      );

    res.json({
      success: true,
      data: docs,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const doc = await Doctor.create({
      name: req.body.name,
      list: req.body.list || [],
    });

    return res.status(201).json({ status: "success", data: doc });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const updateData = {};
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.list !== undefined) updateData.list = req.body.list;

    const doc = await Doctor.findByIdAndUpdate(
      req.params.id,
      updateData,
    );
    if (!doc) return res.status(404).json({ status: "failed", message: "Not found" });
    res.json({ status: "success", data: doc });
  } catch (err) {
    next(err);
  }
}

module.exports = { ...crud, create, update, list, specialList };
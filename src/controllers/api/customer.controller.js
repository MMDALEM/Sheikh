const Customer = require("../../models/customer.model");
const { buildDateFilter } = require("../../utils/dateFilter");

// CREATE
async function create(req, res, next) {
  try {
    const customer = await Customer.create(req.body);
    return res.status(201).json({ status: "success", data: customer });
  } catch (err) {
    next(err);
  }
}

// LIST with date filter + sum of clinicPrice
async function list(req, res, next) {
  try {
    const dateFilter = buildDateFilter(req.query);

    const customers = await Customer.find(dateFilter)
      .populate("surgery.surgeryId")
      .populate("doctor.doctorId")
      .populate("initialCosts.initialPriceId")
      .populate("reagent.reagentId")
      .populate("assist.assistId")
      .populate("sharedCosts.sharedId")
      .populate("hospital.hospitalId")
      .sort({ createdAt: -1 });

    const totalClinicPrice = customers.reduce((sum, c) => sum + (c.clinicPrice || 0), 0);

    res.json({
      success: true,
      data: customers,
      totalClinicPrice,
      count: customers.length,
    });
  } catch (err) {
    console.log("Error in list function:", err); // Debug log
    next(err);
  }
}

// GET single
async function getById(req, res, next) {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate("surgery.surgeryId")
      .populate("doctor.doctorId")
      .populate("initialCosts.initialPriceId")
      .populate("reagent.reagentId")
      .populate("assist.assistId")
      .populate("sharedCosts.sharedId")
      .populate("hospital.hospitalId");

    if (!customer) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
}

// UPDATE
async function update(req, res, next) {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!customer) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
}

// DELETE
async function remove(req, res, next) {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, delete: remove };

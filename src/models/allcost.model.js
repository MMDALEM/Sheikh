const mongoose = require("mongoose");

const allCostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const allCostModel = mongoose.model('AllCost', allCostSchema);
module.exports = allCostModel;
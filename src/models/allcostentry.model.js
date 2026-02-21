const mongoose = require("mongoose");

const allCostEntrySchema = new mongoose.Schema(
  {
    allCostId: { type: mongoose.Schema.Types.ObjectId, ref: "AllCost", required: true },
    price: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const allCostEntryModel = mongoose.model('AllCostEntry', allCostEntrySchema);
module.exports = allCostEntryModel;
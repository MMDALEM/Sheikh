const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const allCostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    from: { type: String },
    desc: { type: String },
    list: { type: [Object], default: [] },
  },
  { timestamps: true }
);

allCostSchema.plugin(mongoosePaginate);

const allCostModel = mongoose.model('AllCost', allCostSchema);
module.exports = allCostModel;
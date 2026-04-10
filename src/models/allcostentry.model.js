const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const allCostEntrySchema = new Schema(
  {
    allCostId: { type: mongoose.Schema.Types.ObjectId, ref: "AllCost", required: true },
    price: { type: Number, required: true },
    date: { type: String },
    from: { type: String },
    desc: { type: String },
    list: { type: [Object], default: [] },
  },
  { timestamps: true }
);

allCostEntrySchema.plugin(mongoosePaginate);

const allCostEntryModel = mongoose.model('AllCostEntry', allCostEntrySchema);
module.exports = allCostEntryModel;
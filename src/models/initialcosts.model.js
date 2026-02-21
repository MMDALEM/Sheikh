const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const initialcostsSchema = new Schema(
  {
    name: { type: String, default: '' },
    customer: [{ type: mongoose.Types.ObjectId, ref: "Customer", default: [] }],
  },
  {
    timestamps: true,
  }
);

initialcostsSchema.plugin(mongoosePaginate);

const initialcostsModel = mongoose.model('InitialCosts', initialcostsSchema);
module.exports = initialcostsModel;
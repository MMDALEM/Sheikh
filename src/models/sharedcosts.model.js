const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const sharedcostsSchema = new Schema(
  {
    name: { type: String, default: '' },
    customer: [{ type: mongoose.Types.ObjectId, ref: "Customer", default: [] }],
  },
  {
    timestamps: true,
  }
);

sharedcostsSchema.plugin(mongoosePaginate);

const sharedcostsModel = mongoose.model('SharedCosts', sharedcostsSchema);
module.exports = sharedcostsModel;
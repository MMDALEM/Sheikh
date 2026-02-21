const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const reagentSchema = new Schema(
  {
    name: { type: String, default: '' },
    customer: [{ type: mongoose.Types.ObjectId, ref: "Customer", default: [] }],
  },
  {
    timestamps: true,
  }
);

reagentSchema.plugin(mongoosePaginate);

const reagentModel = mongoose.model('Reagent', reagentSchema);
module.exports = reagentModel;
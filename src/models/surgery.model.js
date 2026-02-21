const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const surgerySchema = new Schema(
  {
    name: { type: String, default: '' },
    customer: [{ type: mongoose.Types.ObjectId, ref: "Customer", default: [] }],
  },
  {
    timestamps: true,
  }
);

surgerySchema.plugin(mongoosePaginate);

const surgeryModel = mongoose.model('Surgery', surgerySchema);
module.exports = surgeryModel;
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const assistSchema = new Schema(
  {
    name: { type: String, default: '' },
    customer: [{ type: mongoose.Types.ObjectId, ref: "Customer", default: [] }],
  },
  {
    timestamps: true,
  }
);

assistSchema.plugin(mongoosePaginate);

const assistModel = mongoose.model('Assist', assistSchema);
module.exports = assistModel;
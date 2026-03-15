const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const hospitalSchema = new Schema(
  {
    name: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

hospitalSchema.plugin(mongoosePaginate);

const hospitalModel = mongoose.model('Hospital', hospitalSchema);
module.exports = hospitalModel;
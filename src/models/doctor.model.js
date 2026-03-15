const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const doctorSchema = new Schema(
  {
    name: { type: String, default: '' },
    list: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);

doctorSchema.plugin(mongoosePaginate);

const doctorModel = mongoose.model('Doctor', doctorSchema);
module.exports = doctorModel;
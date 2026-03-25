const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const lunchSchema = new mongoose.Schema(
    {
        name: { type: String },
        date: { type: String },
        desc: { type: String },
        price: { type: Number },
        list: { type: [Object], default: [] },
    },
    { timestamps: true }
);

lunchSchema.plugin(mongoosePaginate);

const lunchModel = mongoose.model('Lunch', lunchSchema);
module.exports = lunchModel;
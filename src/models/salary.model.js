const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const salarySchema = new mongoose.Schema(
    {
        name: { type: String },
        date: { type: String },
        desc: { type: String },
        price: { type: Number },
        list: { type: [Object], default: [] },
    },
    { timestamps: true }
);

salarySchema.plugin(mongoosePaginate);

const salaryModel = mongoose.model('Salary', salarySchema);
module.exports = salaryModel;
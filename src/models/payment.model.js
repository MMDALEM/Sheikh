const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const paymentSchema = new mongoose.Schema(
    {
        name: { type: String },
        date: { type: String },
        desc: { type: String },
        price: { type: Number },
        type: { type: String },
        from: { type: String },
        list: { type: [Object], default: [] },
    },
    { timestamps: true }
);

paymentSchema.plugin(mongoosePaginate);

const paymentModel = mongoose.model('Payment', paymentSchema);
module.exports = paymentModel;
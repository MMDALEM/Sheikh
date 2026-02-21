const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const customerSchema = new Schema(
  {
    patientName: { type: String, required: true, trim: true },

    surgery: {
      surgeryId: { type: mongoose.Schema.Types.ObjectId, ref: "Surgery", required: true },
      price: { type: Number, required: true },
    },

    doctor: {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
      percent: { type: Number, required: true },
      price: { type: Number, required: true },
    },

    initialCosts: [
      {
        initialPriceId: { type: mongoose.Schema.Types.ObjectId, ref: "InitialCosts", required: true },
        price: { type: Number, required: true },
      },
    ],

    reagent: {
      reagentId: { type: mongoose.Schema.Types.ObjectId, ref: "Reagent" },
      percent: { type: Number },
      price: { type: Number },
    },

    assist: {
      assistId: { type: mongoose.Schema.Types.ObjectId, ref: "Assist" },
      desc: { type: String, default: "" },
      price: { type: Number },
    },

    sharedCosts: [
      {
        sharedId: { type: mongoose.Schema.Types.ObjectId, ref: "SharedCosts", required: true },
        date: { type: String },
        price: { type: Number, required: true },
      },
    ],

    deposit: [
      {
        desc: { type: String, default: "" },
        date: { type: String },
        price: { type: Number, required: true },
      },
    ],

    hospital: [
      {
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
        desc: { type: String, default: "" },
        price: { type: Number, required: true },
      },
    ],

    date: { type: String, required: true },

    clinicPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

customerSchema.plugin(mongoosePaginate);

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;
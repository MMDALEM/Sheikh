const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    patientName: { type: String, trim: true },

    surgery: {
      surgeryId: { type: mongoose.Schema.Types.ObjectId, ref: "Surgery" },
      price: { type: Number },
    },

    doctor: {
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
      percent: { type: Number },
      price: { type: Number },
    },

    initialCosts: [
      {
        initialPriceId: { type: mongoose.Schema.Types.ObjectId, ref: "InitialCosts" },
        price: { type: Number },
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

    deposit: { type: [Object], default: [] },

    hospital: [
      {
        hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
        desc: { type: String, default: "" },
        price: { type: Number },
      },
    ],

    date: { type: String },
    clinicPrice: { type: Number },

    oldAssist: { type: Number, default: 0 },
    oldHospital: { type: Number, default: 0 },
    sideCost: { type: Number, default: 0 },
    clinicHospital: { type: Number, default: 0 },
  },
  { timestamps: true }
);

customerSchema.plugin(mongoosePaginate);

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;
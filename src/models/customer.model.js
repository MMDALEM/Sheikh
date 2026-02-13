const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const customerSchema = new Schema(
  {
    patientName: {
      type: String,
      lowercase: true,
      required: [true, 'نام کاربری الزامی است'],
      maxlength: [50, 'نام کاربری نباید بیشتر از 50 کاراکتر باشد'],
    },
    surgeryId: { type: mongoose.Types.ObjectId, ref: "Surgery" },
    sharedId: { type: mongoose.Types.ObjectId, ref: "Surgery" },
    deposit: {
      desc: { type: String },
      date: { type: Date },
      price: { type: Number }
    },
    surgery: { type: mongoose.Types.ObjectId, ref: "Surgery" },
    surgery: { type: mongoose.Types.ObjectId, ref: "Surgery" },
    surgery: { type: mongoose.Types.ObjectId, ref: "Surgery" },

    password: {
      type: String,
      required: [true, 'رمز عبور الزامی است'],
      minlength: [6, 'رمزعبور باید حداقل 6 کاراکتر باشد'],
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: [50, 'نام نباید بیشتر از 50 کاراکتر باشد']
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, 'نام خانوادگی نباید بیشتر از 50 کاراکتر باشد']
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(mongoosePaginate);

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;
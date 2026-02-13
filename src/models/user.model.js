const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'نام کاربری الزامی است'],
      minlength: [3, 'نام کاربری باید حداقل 3 کاراکتر باشد'],
      maxlength: [50, 'نام کاربری نباید بیشتر از 50 کاراکتر باشد'],
      match: [/^[a-zA-Z0-9_]+$/, 'نام کاربری فقط حروف انگلیسی، اعداد و _ مجاز است']
    },
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
    hashIdPublic: { type: String, required: "ورودی اجباری", unique: true },
    hashIdAuth: { type: String, required: "ورودی اجباری", unique: true },
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

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
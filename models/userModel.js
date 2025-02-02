const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username should not be empty'],
    unique: true,
    trim: true,
    minlength: [7, 'Username should be more than 7 characters'],
    maxlength: [20, 'Username should not exceed 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email should not be empty'],
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number should not be empty'],
    unique: true,
    validate: {
      validator: function (mobile) {
        return validator.isMobilePhone(mobile, 'en-IN');
      },
      message: 'Please enter a valid mobile number',
    },
  },
  password: {
    type: String,
    required: [true, 'Password should not be empty'],
    minlength: [8, 'Password must be more than 8 characters'],
    maxlength: [20, 'Password should not exceed 20 characters'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm Password should not be empty'],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "Passwords don't match",
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.isPasswordValid = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

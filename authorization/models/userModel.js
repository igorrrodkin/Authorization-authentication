const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'User must have a name'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength:8,
    select:false
  },
  passwordConfirm: {
    type:String,
    required: [true, 'User must confirm a password'],
    validate: {
        validator:function(el) {
            return el === this.password;
        },
        message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
});


userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
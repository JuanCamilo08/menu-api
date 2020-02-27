const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  email: {
    type: String,
    min: 5,
    max: 100,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  }
})

module.exports.User = mongoose.model('user', schema);

module.exports.validateUser = function(user){
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(200).required(),
    isAdmin: Joi.bool()
  });

  return Joi.validate(user, schema)
}
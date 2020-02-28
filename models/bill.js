const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  costumer: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  items: {
    type: [{type: mongoose.Types.ObjectId, ref: 'food'}],
    required: true,
    min: 1,
    max: 25
  },
  totalPrice: {
    type: Number,
    min: 80,
    max: 5000,
    required: true
  }
});

module.exports.Ingredient = mongoose.model('bill', schema);

module.exports.validateIngredient = function(bill){
  const schema = Joi.Object({
    customer: Joi.objectId().required(),
    date: Joi.date(),
    items: Joi.array().items(Joi.objectId()).min(1).max(25).required(),
    totalPrice: Joi.number().min(80).max(5000).required()
  })

  return schema.validate(bill);
}


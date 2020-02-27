const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 200
  },
  ingredients: {
    type: [mongoose.Types.ObjectId],
    required: true,
    min: 1,
    max: 25
  },
  price: {
    type: Number,
    min: 80,
    max: 500,
    required: true
  }
});

module.exports.Ingredient = mongoose.model('food', schema);

module.exports.validateIngredient = function(food){
  const schema = Joi.Object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(200),
    ingredients: Joi.array().items(Joi.objectId()).min(1).max(25).required(),
    price: Joi.number().min(80).max(500).required()
  })

  return schema.validate(food);
}

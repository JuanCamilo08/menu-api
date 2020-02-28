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
    type: [{ type: mongoose.Types.ObjectId, ref: 'ingredient' }],
    required: true,
    min: 1,
    max: 25
  },
  price: {
    type: Number,
    min: 80,
    max: 500,
    required: true
  },
  cathegory: {
    type: String,
    enum: ['salads', 'main dishes'],
    required: true
  }
});

module.exports.Food = mongoose.model('food', schema);

module.exports.validateFood = function(food) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .max(200),
    ingredients: Joi.array()
      .items(Joi.objectId())
      .min(1)
      .max(25)
      .required(),
    price: Joi.number()
      .min(80)
      .max(500)
      .required(),
    cathegory: Joi.string()
      .required()
      .valid('salads', 'main dishes')
  });

  return schema.validate(food);
};

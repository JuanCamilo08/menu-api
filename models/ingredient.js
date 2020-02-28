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
  }
});

module.exports.Ingredient = mongoose.model('ingredient', schema);

module.exports.validateIngredient = function(ingredient) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .max(200)
  });

  return schema.validate(ingredient);
};

const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 400
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

module.exports.Suggestion = mongoose.model('suggestion', schema);

module.exports.validateSuggestion = function(suggestion) {
  const schema = Joi.object({
    message: Joi.string()
      .required()
      .min(10)
      .max()
  });

  return schema.validate(suggestion, schema);
};

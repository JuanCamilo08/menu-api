const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const schema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  items: {
    type: [{ type: mongoose.Types.ObjectId, ref: 'food' }],
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

module.exports.Bill = mongoose.model('bill', schema);

module.exports.validateBill = function(bill) {
  const schema = Joi.object({
    customer: Joi.objectId(),
    date: Joi.date(),
    items: Joi.array()
      .items(Joi.objectId())
      .min(1)
      .max(25)
      .required(),
    totalPrice: Joi.number()
      .min(80)
      .max(5000)
  });

  return schema.validate(bill);
};

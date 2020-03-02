const express = require('express');
const router = express.Router();
const { Bill, validateBill } = require('../models/bill');
const { Food } = require('../models/food');
const validator = require('../middlewares/validator');
const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/', [auth, admin], async (req, res) => {
  try {
    const bill = await Bill.find();
    res.send(bill);
  } catch (ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const Bill = await Bill.findById(req.params.id)
    .select('-__v')
    .populate('items', '-__v')
    .populate('customer', '-password -__v');
  if (!Bill) return res.status(404).send('The bill with the given ID was not found.');

  res.send(Bill);
});

router.post('/', [auth, admin, validator(validateBill)], async (req, res) => {
  const priceT = await totalPrice(req.body.items);
  let bill = await new Bill({ customer: req.user._id, ...req.body, totalPrice: priceT }).save();

  res.status(201).send(bill);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validateBill)], async (req, res) => {
  const priceT = await totalPrice(req.body.items);

  const bill = await Bill.findByIdAndUpdate(
    req.params.id,
    {
      totalPrice: priceT,
      items: req.body.items
    },
    { new: true }
  );
  if (!bill) return res.status(404).send('The bill with the given ID was not found.');

  res.send(bill);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
  const bill = await Bill.findByIdAndRemove(req.params.id);
  if (!bill) return res.status(404).send('The bill with the given ID was not found.');

  res.send(bill);
});

async function totalPrice(items) {
  let prices = await Food.find({ _id: { $in: items } }).select('price');

  let priceT = 0;
  prices.forEach(({ price }) => {
    priceT += price;
  });

  return priceT;
}

module.exports = router;

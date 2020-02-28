const express = require('express');
const router = express.Router();
const { Food, validateFood } = require('../models/food');
const validator = require('../middlewares/validator');
const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/', auth, async (req, res) => {
  try {
    const foods = await Food.find();
    res.send(foods);
  } catch (ex) {
    res.status(500).send('Something failed.');
  }
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
  const food = await Food.findById(req.params.id).populate('ingredients');
  if (!food) return res.status(404).send('The food with the given ID was not found.');

  res.send(food);
});

router.post('/', [auth, admin, validator(validateFood)], async (req, res) => {
  let food = new Food(req.body);
  food = await food.save();

  res.send(food);
});

router.put('/:id', [auth, admin, validateObjectId, validator(validateFood)], async (req, res) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!food) return res.status(404).send('The food with the given ID was not found.');

  res.send(food);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const food = await Food.findByIdAndRemove(req.params.id);
  if (!food) return res.status(404).send('The food with the given ID was not found.');

  res.send(food);
});

module.exports = router;

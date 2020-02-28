const express = require('express');
const router = express.Router();
const { Ingredient, validateIngredient } = require('../models/ingredient');
const validator = require('../middlewares/validator');
const validateObjectId = require('../middlewares/validateObjectId');

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.send(ingredients);
  } catch (ex) {
    res.status(500).send('Something failed.');
  }
});

router.post('/', validator(validateIngredient), async (req, res) => {
  let ingredient = new Ingredient({
    name: req.body.name,
    description: req.body.description
  });
  ingredient = await ingredient.save();

  res.send(ingredient);
});

router.put('/:id', [validateObjectId, validator(validateIngredient)], async (req, res) => {
  const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');

  res.send(ingredient);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
  if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');

  res.send(ingredient);
});

module.exports = router;

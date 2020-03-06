const express = require('express');
const router = express.Router();
const { Ingredient, validateIngredient } = require('../models/ingredient');
const validator = require('../middlewares/validator');
const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/', [auth, admin], async (req, res) => {
  const ingredients = await Ingredient.find();
  res.send(ingredients);
});

router.post('/', [auth, admin, validator(validateIngredient)], async (req, res) => {
  let ingredient = new Ingredient({
    name: req.body.name,
    description: req.body.description
  });
  ingredient = await ingredient.save();

  res.send(ingredient);
});

router.put(
  '/:id',
  [auth, admin, validateObjectId, validator(validateIngredient)],
  async (req, res) => {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');

    res.send(ingredient);
  }
);

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const ingredient = await Ingredient.findByIdAndRemove(req.params.id);
  if (!ingredient) return res.status(404).send('The ingredient with the given ID was not found.');

  res.send(ingredient);
});

module.exports = router;

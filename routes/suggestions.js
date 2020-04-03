const express = require('express');
const router = express.Router();
const { Suggestion, validateSuggestion } = require('../models/suggestion');
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');

router.post('/', [auth, validator(validateSuggestion)], async (req, res) => {
  let suggestion = await new Suggestion({ ...req.body, customer: req.user._id }).save();
  res.status(201).send(suggestion);
});

module.exports = router;

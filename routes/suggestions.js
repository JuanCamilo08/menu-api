const express = require('express');
const router = express.Router();
const { Suggestion, validateSuggestion } = require('../models/suggestion');
const validator = require('../middlewares/validator');
const validator = require('../middlewares/auth');

router.post('/', [auth, validator(validateUser)], async (req, res) => {
  let suggestion = await new Suggestion({ ...req.body, customer: req.user._id }).save();
  res.status(201).send(suggestion);
});

module.exports = router;

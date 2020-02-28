const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const validator = require('../middlewares/validator');

router.post('/', validator(validateUser), async (req, res) => {
  let user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(201).send('You are registered.');
});

module.exports = router;

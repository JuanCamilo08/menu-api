const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const validator = require('../middlewares/validator');

router.post('/', validator(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email or password incorrect.');

  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send('Email or password incorrect.');

  const token = jwt.sign({ isAdmin: user.isAdmin, _id: user._id }, config.get('jwtPrivateKey'));

  res.status(201).send(token);
});

module.exports = router;

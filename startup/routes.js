const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ingredients = require('../routes/ingredients');
const food = require('../routes/foods');
const register = require('../routes/register');

module.exports = function(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use('/api/ingredient', ingredients);
  app.use('/api/food', food);
  app.use('/api/register', register);
};

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ingredients = require('../routes/ingredients');
const foods = require('../routes/foods');
const register = require('../routes/register');
const login = require('../routes/login');
const bills = require('../routes/bills');

module.exports = function(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use('/api/ingredient', ingredients);
  app.use('/api/food', foods);
  app.use('/api/register', register);
  app.use('/api/login', login);
  app.use('/api/bill', bills);
};

const express = require('express');
const morgan = require('morgan');
const ingredients = require('../routes/ingredients');

module.exports = function(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api/ingredient', ingredients);
};

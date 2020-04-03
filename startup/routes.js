const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ingredients = require('../routes/ingredients');
const foods = require('../routes/foods');
const register = require('../routes/register');
const login = require('../routes/login');
const bills = require('../routes/bills');
const suggestion = require('../routes/suggestions');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../middlewares/swagger');

module.exports = function(app) {
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use('/api-docs', swaggerDoc, swaggerUi.serve, swaggerUi.setup());
  app.use('/api/register', register);
  app.use('/api/login', login);
  app.use('/api/ingredient', ingredients);
  app.use('/api/food', foods);
  app.use('/api/bill', bills);
  app.use('/api/suggestion', suggestion);
};

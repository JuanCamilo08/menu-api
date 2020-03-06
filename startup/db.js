const mongoose = require('mongoose');
const { logger } = require('./logging');

module.exports = async function() {
  const db = await mongoose.connect('mongodb://localhost:27017/food-menu', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  if (db) logger.info('mongoDB connected...');
};

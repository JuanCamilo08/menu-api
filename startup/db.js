const mongoose = require('mongoose');

module.exports = async function() {
  try {
    const db = await mongoose.connect('mongodb:localhost:27017/api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    if (db) console.log('mongoDB connected...');
  } catch (ex) {
    console.error(ex);
  }
};

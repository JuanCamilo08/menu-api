const swaggerDocument = require('../utils/swaggerDoc.json');

module.exports = function(req, res, next) {
  swaggerDocument.host = req.get('host');
  req.swaggerDoc = swaggerDocument;
  next();
};

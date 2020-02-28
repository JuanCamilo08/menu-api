module.exports = function(validator) {
  return (req, res, next) => {
    const { error, value } = validator(req.body);
    if (error) return res.status(400).send(error.message);
    res.body = value;
    next();
  };
};

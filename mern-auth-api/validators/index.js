const { validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    const filteredErrors = errors.array().filter(error => error.msg !== 'Invalid value')
    if (filteredErrors[0]) {
      return res.status(422).json({
        error: filteredErrors[0].msg // return first real validation error
      });
    } else {
      return res.status(422).json({
        error: errors.array()[0].msg // return first validation error
      });
    }
  }
  next();
};

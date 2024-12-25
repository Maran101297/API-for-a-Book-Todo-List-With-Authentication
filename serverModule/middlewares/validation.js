const { body, validationResult } = require('express-validator');

const bookValidationRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('year')
    .trim()
    .notEmpty()
    .withMessage('Year is required')
    .isNumeric()
    .withMessage('Year must be a number')
    .isLength({ min: 4, max: 4 })
    .withMessage('Year must be a valid 4-digit year'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  bookValidationRules,
  validate,
};

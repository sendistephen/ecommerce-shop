const { check } = require('express-validator');

exports.productCreateValidator = [
  check('title').not().isEmpty().withMessage('Product title is required'),
  check('description')
    .not()
    .isEmpty()
    .withMessage('Product description is required'),
  check('photo').not().isEmpty().withMessage('Product photo is required'),
  check('price').not().isEmpty().withMessage('Product price is required'),
  check('stockQuantity')
    .not()
    .isEmpty()
    .withMessage('Product stock quantity is required'),
];

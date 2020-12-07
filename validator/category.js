const { check } = require('express-validator');

exports.categoryCreateValidator = [
  check('type').not().isEmpty().withMessage('Type is required'),
];

const asyncHandler = require('../middleware/async');
const Category = require('../models/category');
const ErrorResponse = require('../utils/errorResponse');

exports.create = asyncHandler(async (req, res, next) => {
  const category = new Category();
  category.type = req.body.type;

  //   check if category with type exists
  const categoryExists = await Category.findOne({ type: req.body.type });
  if (categoryExists) {
    return next(
      new ErrorResponse('Category with the same type already exists'),
    );
  }
  //   save category
  await category.save((err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

// update category
exports.update = asyncHandler(async (req, res, next) => {
  // find if category exists
  const { type } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.type = type;
  }

  // save category
  await category.save((err, result) => {
    if (err) {
      return next(err);
    } else {
      res.json(result);
    }
  });
});

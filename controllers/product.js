const asyncHandler = require('../middleware/async');
const Product = require('../models/product');

exports.create = asyncHandler(async (req, res, next) => {
  const product = new Product();

  product.title = req.body.title;
  product.description = req.body.description;
  product.photo = req.file.location;
  product.price = req.body.price;
  product.stockQuantity = req.body.stockQuantity;

  // save product
  await product.save((err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

// Get all products
exports.list = asyncHandler(async (req, res, next) => {
  await Product.find({}).exec((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  });
});

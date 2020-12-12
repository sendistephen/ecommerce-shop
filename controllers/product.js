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

// update product
exports.update = asyncHandler(async (req, res, next) => {
  await Product.findOneAndUpdate(
    { _id: req.params.productId },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        photo: req.file.location,
        price: req.body.price,
        stockQuantity: req.body.stockQuantity,
        category: req.body.categoryId,
      },
    },
    { upsert: true },
    (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true, result });

// get single product
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).exec(
    (err, result) => {
      if (err || !product) {
        return next(err);
      }
      res.json(result);
    },
  );
});

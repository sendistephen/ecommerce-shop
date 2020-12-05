const Product = require('../models/product');
const ErrorResponse = require('../utils/errorResponse');

exports.create = async (req, res, next) => {
  try {
    const product = new Product();

    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    // save product
    await product.save((err, result) => {
      if (err) {
        return next(new ErrorResponse(`Product not saved`, 400));
      }
      res.status(200).json(product);
    });
  } catch (error) {
    next(new ErrorResponse(`There was an error creating product`, 500));
  }
};

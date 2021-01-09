const Review = require('../models/review');
const Product = require('../models/product');
const asyncHandler = require('../middleware/async');

exports.create = asyncHandler(async (req, res) => {
  const newReview = new Review();
  newReview.headline = req.body.headline;
  newReview.body = req.body.body;
  newReview.rating = req.body.rating;
  newReview.photo = req.file.location;
  newReview.user = req.user._id;
  newReview.productId = req.params.productId;
  // update product by pushing a review id to its array
  await Product.update({ $push: { reviews: newReview._id } });
  //   save review
  await newReview.save((err, review) => {
    if (err) {
      res.status(500);
      throw new Error('Something went wrong');
    }
    res.json({ review, success: true, message: 'Successfuly added review' });
  });
});

exports.read = asyncHandler(async (req, res) => {
  await Review.find({ productId: req.params.productId })
    .populate('user')
    .exec((err, reviews) => {
      if (err) {
        res.status(500);
        throw new Error('Something went wrong');
      }
      res.json({ reviews, success: true });
    });
});

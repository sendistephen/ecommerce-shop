const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  headline: { type: String },
  body: { type: String },
  rating: { type: Number },
  photo: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Review', ReviewSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
    title: { type: String, required: true, maxlength: 32 },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true, trim: true, maxlength: 32 },
    stockQuantity: { type: Number, required: true, trim: true, maxlength: 32 },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

ProductSchema.virtual('averageRating').get(function () {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0);
    return sum / this.reviews.length;
  }
  return 0;
});
module.exports = mongoose.model('Product', ProductSchema);

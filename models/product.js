const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'category' },
  title: { type: String, required: true, maxlength: 32 },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true, trim: true, maxlength: 32 },
  stockQuantity: { type: Number, required: true, trim: true, maxlength: 32 },
  rating: [],
});
module.exports = mongoose.model('Product', ProductSchema);

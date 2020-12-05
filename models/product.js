const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String },
  price: { type: Number, required: true, trim: true, maxlength: 32 },
  stockQuantity: { type: Number, required: true, trim: true, maxlength: 32 },
  rating: [],
});
module.exports = mongoose.model('Product', ProductSchema);

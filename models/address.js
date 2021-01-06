const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  country: { type: String },
  fullname: { type: String, trim: true, maxlength: 32, required: true },
  streetAddress: { type: String, trim: true, maxlength: 32, required: true },
  city: { type: String, trim: true, maxlength: 32, required: true },
  state: { type: String, trim: true, maxlength: 32, required: true },
  zipCode: { type: Number },
  phoneNumber: { type: String, required: true, maxlength: 12 },
  deliveryInstructions: { type: String, required: true, maxlength: 100 },
  securityCode: { type: String },
});

module.exports = mongoose.model('Address', AddressSchema);

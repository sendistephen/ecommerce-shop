const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: { type: String, required: true, maxlength: 32 },
  about: { type: String, maxlength: 1000 },
  photo: { type: String },
});

module.exports = mongoose.model('owner', ownerSchema);

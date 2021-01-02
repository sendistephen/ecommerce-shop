const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, trim: true, maxlength: 32, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  hashed_password: { type: String, required: true },
  salt: String,
  address: { type: Schema.Types.ObjectId, ref: 'address' },
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};
module.exports = mongoose.model('user', UserSchema);

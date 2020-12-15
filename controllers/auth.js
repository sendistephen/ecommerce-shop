const asyncHandler = require('../middleware/async');
const User = require('../models/user');

exports.create = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  }
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.json(400);
    throw new Error('Email already exist');
  }

  const user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  user.address = req.body.address;

  await user.save((err, user) => {
    if (err) {
      res.status(400).json({ error: 'Something went wrong' });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
});

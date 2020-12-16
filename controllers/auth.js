const asyncHandler = require('../middleware/async');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // find user by email
  await User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'User with that email does not exist' });
    }
    // check if user is authenticated
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: 'Email or password is incorrect' });
    }
    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist token in cookie
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response
    const { _id, email, username } = user;
    return res.json({ token, user: { _id, email, username } });
  });
});

const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const asyncHandler = require('../middleware/async');
const User = require('../models/user');

exports.create = asyncHandler(async (req, res) => {
  if (!req.body.email) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter valid email' });
  }
  if (!req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: 'Please enter password' });
  }
  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    res.status(400);
    throw new Error('Email already exist');
  }

  const userObject = new User();
  userObject.username = req.body.username;
  userObject.email = req.body.email;
  userObject.password = req.body.password;
  userObject.address = req.body.address;

  await userObject.save((err, user) => {
    if (err) {
      res.status(500);
      throw new Error('Something went wrong');
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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    // persist token in cookie
    res.cookie('t', token, { expire: '1d' });
    // return response
    const { _id, username } = user;
    return res.json({ token, user: { _id, email, username } });
  });
});

exports.signout = asyncHandler(async (req, res) => {
  res.clearCookie('t');
  res.json({ success: true, message: 'Signout success' });
});

exports.isProtected = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

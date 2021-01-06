const User = require('../models/user');

const isAuthenticated = (req, res, next) => {
  const authUserId = req.user._id;
  //   check if user exists in the database
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Access denied' });
    }
  });
  // if user is found, make it available in req.profile
  req.profile = user;
  next();
};

module.exports = isAuthenticated;

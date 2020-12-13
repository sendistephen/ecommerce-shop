const asyncHandler = require('../middleware/async');
const Owner = require('../models/owner');

exports.create = asyncHandler(async (req, res, next) => {
  const ownerExists = await Owner.findOne({ name: req.body.name });
  if (ownerExists) {
    res.status(500);
    throw new Error('Onwer with the name already exists');
  } else {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;
    await owner.save((err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    });
  }
});

// Get all owners
exports.list = asyncHandler(async (req, res, next) => {
  await Owner.find({}).exec((err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});

// delete owner
exports.remove = asyncHandler(async (req, res, next) => {
  const owner = await Owner.findById(req.params.ownerId);
  if (!owner) {
    res.status(400);
    throw new Error('Owner not found');
  } else {
    await owner.remove();
    res.json({ success: true, message: 'Owner removed' });
  }
});

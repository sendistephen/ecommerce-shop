const { Error } = require('mongoose');
const asyncHandler = require('../middleware/async');
const Address = require('../models/address');

exports.create = asyncHandler(async (req, res) => {
  const addressObject = new Address();

  addressObject.user = req.user._id;
  addressObject.country = req.body.country;
  addressObject.fullname = req.body.fullname;
  addressObject.streetAddress = req.body.streetAddress;
  addressObject.city = req.body.city;
  addressObject.state = req.body.state;
  addressObject.zipCode = req.body.zipCode;
  addressObject.phoneNumber = req.body.phoneNumber;
  addressObject.deliveryInstructions = req.body.deliveryInstructions;
  addressObject.securityCode = req.body.securityCode;

  //   save address
  await addressObject.save((err, address) => {
    if (err) {
      res.status(500);
      throw new Error('Something went wrong');
    }
    res.json(address);
  });
});

exports.list = asyncHandler(async (req, res) => {
  await Address.find().exec((err, addresses) => {
    if (err) {
      return res.status(400).json({ error: 'Addresses not found' });
    }
    res.json(addresses);
  });
});

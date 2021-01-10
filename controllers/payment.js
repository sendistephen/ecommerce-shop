const moment = require('moment');
const stripe = require('stripe');
const asyncHandler = require('../middleware/async');
const Order = require('../models/order');

// creating an object that handleshipment options; normal & fast
const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7,
  },
  fast: {
    price: 49.98,
    days: 3,
  },
};
// this function handles the price of the stimated delivery date
function shipmentPrice(shipmentOption) {
  const estimated = moment()
    .add(shipmentOption.days, 'd')
    .format('dddd MMM Do');
  return { estimated, price: shipmentOption.price };
}

exports.createShipment = (req, res) => {
  try {
    let shipment;
    if (req.body.shipment === 'normal') {
      shipment = shipmentPrice(SHIPMENT.normal);
    } else {
      shipment = shipmentPrice(SHIPMENT.fast);
    }
    res.json({ success: true, shipment });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error('Something is wrong');
  }
};
exports.createPayment = asyncHandler(async (req, res) => {
  const totalPrice = Math.round(req.body.totalPrice * 100);
  await stripe.customers
    .create({
      email: req.user.email,
    })
    .then(customer => {
      return stripe.customers.createSource(customer.id, { source: 'tok_visa' });
    })
    .then(source => {
      return stripe.charges.create({
        amount: totalPrice,
        currency: 'usd',
        customer: source.customer,
      });
    })
    .then(async () => {
      const order = new Order();
      const { cart } = req.body;
      await cart.map(product => {
        return order.products.push({
          productId: product._id,
          // eslint-disable-next-line radix
          quantity: parseInt(product.quantity),
          price: product.price,
        });
      });
      order.owner = req.user._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();
    })
    .catch(error => {
      console.log(error);
      res.status(500);
      throw new Error('Something is wrong');
    });
});

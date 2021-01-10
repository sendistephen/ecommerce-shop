const express = require('express');
const { createPayment, createShipment } = require('../controllers/payment');

const router = express.Router();

router.post('/shipment', createShipment);
router.post('/payment', createPayment);

module.exports = router;

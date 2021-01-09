const express = require('express');
const { listCountries } = require('../controllers/country');
const router = express.Router();

router.get('/countries', listCountries);

module.exports = router;

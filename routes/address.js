const express = require('express');
const { create } = require('../controllers/address');
const { isProtected } = require('../controllers/auth');
const router = express.Router();

router.post('/address/new', isProtected, create);

module.exports = router;

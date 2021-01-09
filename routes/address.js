const express = require('express');
const { create, list } = require('../controllers/address');
const { isProtected } = require('../controllers/auth');
const router = express.Router();

router.post('/address/new', isProtected, create);
router.get('/addresses', isProtected, list);
router.get('/addresses', isProtected, list);

module.exports = router;

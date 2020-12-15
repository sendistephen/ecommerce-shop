const express = require('express');
const { create } = require('../controllers/auth');

const router = express.Router();

router.post('/auth/signup', create);

module.exports = router;

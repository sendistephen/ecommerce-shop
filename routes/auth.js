const express = require('express');
const { create, signin } = require('../controllers/auth');

const router = express.Router();

router.post('/auth/signup', create);
router.post('/auth/signin', signin);

module.exports = router;

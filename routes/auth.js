const express = require('express');
const { create, signin, signout } = require('../controllers/auth');

const router = express.Router();

router.post('/auth/signup', create);
router.post('/auth/signin', signin);
router.post('/auth/signout', signout);

module.exports = router;

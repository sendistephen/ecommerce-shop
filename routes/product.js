const express = require('express');
const router = express.Router();
const { create } = require('../controllers/product');
const upload = require('../middleware/upload-photo');

router.post('/products/create', upload.single('photo'), create);

module.exports = router;

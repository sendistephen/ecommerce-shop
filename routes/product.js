const express = require('express');
const router = express.Router();
const { create, list } = require('../controllers/product');
const upload = require('../middleware/upload-photo');
const { runValidation } = require('../validator');
const { productCreateValidator } = require('../validator/product');

router.post(
  '/products/create',
  productCreateValidator,
  runValidation,
  upload.single('photo'),
  create,
);
router.get('/products', list);
module.exports = router;

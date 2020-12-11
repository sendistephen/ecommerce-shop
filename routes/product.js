const express = require('express');
const router = express.Router();
const { create, list, getProductById } = require('../controllers/product');
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
router.get('/product/:productId', getProductById);
module.exports = router;

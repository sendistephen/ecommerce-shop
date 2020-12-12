const express = require('express');
const router = express.Router();
const {
  create,
  list,
  getProductById,
  update,
  remove,
} = require('../controllers/product');
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
router.put('/product/:productId', upload.single('photo'), update);
router.get('/product/:productId', getProductById);
router.delete('/product/:productId', remove);
module.exports = router;

const express = require('express');
const router = express.Router();
const { create, update, remove, list } = require('../controllers/category');
const { runValidation } = require('../validator');
const { categoryCreateValidator } = require('../validator/category');

router.post(
  '/categories/create',
  categoryCreateValidator,
  runValidation,
  create,
);
router.get('/categories', list);
router.put('/category/:id', categoryCreateValidator, runValidation, update);
router.delete('/category/:id', remove);

module.exports = router;

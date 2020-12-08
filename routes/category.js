const express = require('express');
const router = express.Router();
const { create, update } = require('../controllers/category');
const { runValidation } = require('../validator');
const { categoryCreateValidator } = require('../validator/category');

router.post(
  '/categories/create',
  categoryCreateValidator,
  runValidation,
  create,
);
router.put('/category/:id', categoryCreateValidator, runValidation, update);

module.exports = router;

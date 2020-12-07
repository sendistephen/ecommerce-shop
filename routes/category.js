const express = require('express');
const router = express.Router();
const { create } = require('../controllers/category');
const { runValidation } = require('../validator');
const { categoryCreateValidator } = require('../validator/category');

router.post(
  '/categories/create',
  categoryCreateValidator,
  runValidation,
  create,
);

module.exports = router;

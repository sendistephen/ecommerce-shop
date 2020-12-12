const express = require('express');
const { create } = require('../controllers/owner');
const upload = require('../middleware/upload-photo');

const router = express.Router();

router.post('/owners', upload.single('photo'), create);
module.exports = router;

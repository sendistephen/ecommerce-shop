const express = require('express');
const { create, read } = require('../controllers/review');
const { isProtected } = require('../controllers/auth');
const upload = require('../middleware/upload-photo');
const router = express.Router();

router.post('/reviews/:productId', upload.single('photo'), isProtected, create);
router.post('/reviews/:productId', read);

module.exports = router;

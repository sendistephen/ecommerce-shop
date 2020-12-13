const express = require('express');
const { create, list } = require('../controllers/owner');
const upload = require('../middleware/upload-photo');

const router = express.Router();

router.post('/owners', upload.single('photo'), create);
router.get('/owners', list);
module.exports = router;

const express = require('express');
const { create, list, remove, update } = require('../controllers/owner');
const upload = require('../middleware/upload-photo');

const router = express.Router();

router.post('/owners', upload.single('photo'), create);
router.get('/owners', list);
router.delete('/owner/:ownerId', remove);
router.put('/owner/:ownerId', upload.single('photo'), update);
module.exports = router;

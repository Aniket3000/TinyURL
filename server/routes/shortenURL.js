const express = require('express');
const { shortenURL } = require('../controllers/shortenURL');
const authMiddleWare = require('../middleware/authmiddleware');
const { redirectURL } = require('../controllers/redirectURL');

const router = express.Router();

router.post('/',authMiddleWare,shortenURL);
router.get('/:shortURL',redirectURL);

module.exports = router;
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

const upload = require('../middleware/multer');
const { authenticate } = require('../middleware/auth');

router.post('/submit',authenticate, upload.single('proof'), paymentController.submitPayment);

module.exports = router;
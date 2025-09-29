const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/auth');

// Endpoint: GET /api/orders/status?packageId=1
router.get('/status', authenticate, orderController.getOrderStatus);

module.exports = router;
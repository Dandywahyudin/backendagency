const express = require('express');
const router = express.Router();
const homeController = require('../src/controllers/homeController');

/* GET home page. */
router.get('/', homeController.getHome);

/* GET health check */
router.get('/api/health', homeController.getHealthCheck);

module.exports = router;

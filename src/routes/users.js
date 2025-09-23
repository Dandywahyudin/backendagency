const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, requireCustomer, requireAdmin } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/profile', authenticate);
router.get('/admin', authenticate, requireAdmin, (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});
router.get('/customer', authenticate, requireCustomer, (req, res) => {
    res.json({ message: 'Welcome, Customer!' });
});

module.exports = router;
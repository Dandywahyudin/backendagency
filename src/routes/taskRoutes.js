const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.use(authenticate, requireAdmin); // Lindungi semua route di file ini

router.get('/', taskController.getAllTasks);
router.patch('/status/:taskId', taskController.updateTaskStatus);

module.exports = router;
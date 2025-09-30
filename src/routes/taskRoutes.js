const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.use(authenticate, requireAdmin); 
router.get('/', taskController.getAllTasks);
router.patch('/status/:taskId', taskController.updateTaskStatus);
router.post('/', taskController.createTask);
router.put('/:taskId', taskController.updateTask);
module.exports = router;
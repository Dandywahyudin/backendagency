const taskService = require('../services/taskService');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    await taskService.updateTaskStatus(taskId, status);
    res.json({ success: true, message: 'Status task berhasil diperbarui' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTasks, updateTaskStatus };
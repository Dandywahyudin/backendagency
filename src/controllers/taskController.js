const taskService = require('../services/taskService');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    // req.body akan berisi semua data dari form, termasuk orderId
    const newTask = await taskService.createTask(req.body); 
    res.status(201).json({
      status: 'success',
      data: newTask,
    });
  } catch (error) {
    console.error(error);
    // Berikan pesan error yang lebih spesifik
    res.status(400).json({ message: error.message });
  }
};

// Fungsi untuk menangani pembaruan status
const updateTaskStatus = async (req, res, next) => {
  try {
    const { taskId } = req.params; // Mengambil ID dari URL
    const { status } = req.body;   // Mengambil status baru dari body request

    if (!status) {
      return res.status(400).json({ message: 'Status field is required' });
    }

    // Memanggil service untuk update database
    const updatedTask = await taskService.updateTaskStatus(taskId, status);

    res.status(200).json({
      status: 'success',
      data: {
        task: updatedTask,
      },
    });
  } catch (error) {
    // Menangani error jika task tidak ditemukan atau error lainnya
    console.error(error);
    res.status(500).json({ message: 'Failed to update task status' });
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const taskData = req.body; // Data dari form edit di frontend

    const updatedTask = await taskService.updateTask(taskId, taskData);
    
    res.status(200).json({
      status: 'success',
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update task details' });
  }
};



module.exports = {
  getAllTasks,
  createTask,
  updateTaskStatus,
  updateTask,
};

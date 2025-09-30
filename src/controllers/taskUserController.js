const taskService = require('../services/taskUserService');

const getMyTasks = async (req, res) => {
  try {
    // Dapatkan userId dari middleware
    console.log('User ID from token:', req.user.id);
    const userId = req.user.id;

    // Panggil service untuk mendapatkan data
    const tasks = await taskService.getTasksByUserId(userId);

    // Kirim respons
    res.status(200).json({
      message: 'Tugas berhasil diambil',
      data: tasks,
    });
  } catch (error) {
    console.error('Error di controller getMyTasks:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

module.exports = {
    getMyTasks
}
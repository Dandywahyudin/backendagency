const { json } = require('express');
const prisma = require('../config/database');
const AppError = require('../errors/AppError');

const getAllTasks = async () => {
  return await prisma.task.findMany({
    include: {
      order: {
        include: {
          package: { select: { name: true } },
          user: { select: { name: true } }
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  });
};

const updateTaskStatus = async (taskId, newStatus) => {
  return await prisma.task.update({
    where: { id: parseInt(taskId) },
    data: { status: newStatus }
  });
};

const createTask = async (taskData) => {
  // Validasi: Judul, status, dan orderId sekarang wajib ada.
  if (!taskData.title || !taskData.status || !taskData.orderId) {
    throw new Error('Title, status, and orderId are required to create a task.');
  }

  return await prisma.task.create({
    data: {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      priority: taskData.priority,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
      
      // Ini adalah bagian kunci:
      // Menghubungkan task ini ke 'order' yang sudah ada menggunakan orderId.
      order: {
        connect: { id: parseInt(taskData.orderId) }
      },
      
      // Anda juga bisa menghubungkan 'assignedTo' jika perlu
      // user: taskData.assignedTo ? { connect: { id: parseInt(taskData.assignedTo) } } : undefined
    },
    // Sertakan data order dan user dalam respons agar bisa langsung ditampilkan di frontend
    include: {
        order: {
            include: {
                user: { select: { name: true } }
            }
        }
    }
  });
};

const updateTask = async (taskId, taskData) => {
  return await prisma.task.update({
    where: { id: parseInt(taskId) },
    data: {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      // Anda bisa menambahkan field lain di sini jika perlu, misal: dueDate
    },
    // Sertakan juga relasi dalam respons agar data di frontend tetap lengkap
    include: {
      order: {
        include: {
          user: { select: { name: true } }
        }
      }
    }
  });
};


const getTasksByUserId = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: {
      order: {
        userId: userId,
      },
    },
    include: {
      order: {
        select: {
          id: true,
          package: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return tasks;
};


module.exports = { getAllTasks, getTasksByUserId, updateTaskStatus, updateTask, createTask };
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

module.exports = { getAllTasks, updateTaskStatus };
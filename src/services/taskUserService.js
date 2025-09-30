const { json } = require('express');
const prisma = require('../config/database');
const AppError = require('../errors/AppError');

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

module.exports = { getTasksByUserId }
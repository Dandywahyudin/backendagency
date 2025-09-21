const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cari user berdasarkan email
const findUserByEmail = async (email) => {
  if (!email) {
    throw new Error('Email harus diisi untuk findUserByEmail');
  }

  return await prisma.user.findUnique({
    where: { email: email },
  });
};

// Simpan user baru
const createUser = async (data) => {
  return await prisma.user.create({ data });
};

module.exports = { findUserByEmail, createUser };

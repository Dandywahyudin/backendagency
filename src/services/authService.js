const bcrypt = require('bcrypt');
const userModels = require('../models/userModels');
const { findUserByEmail } = require('../models/userModels');
const { generateToken, destroyToken } = require('../utils/jwt');

const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password salah');
    }
    
    const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    },);
    return { user, token };
};

const logoutUser = (token) => {
    if (!token) {
        throw new Error('Token is required for logout');
    } else {
        destroyToken(token);
    }
    return true;
}

async function registerUser(data) {
  // Validasi input
  if (!data.email || !data.password || !data.name) {
    throw new Error('Name, email, dan password wajib diisi');
  }

  const existingUser = await userModels.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Simpan ke DB
  const user = await userModels.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || 'CUSTOMER',
  });

  return user;
}
console.log('loginUser export =', loginUser);
module.exports = { 
    registerUser, 
    loginUser, 
    logoutUser 
  };

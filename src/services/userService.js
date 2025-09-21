const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../repositories/userRepository');
const { destroyToken } = require('../utils/tokenManager');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User tidak ditemukan');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password salah');
    }

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }, JWT_SECRET, { expiresIn: '1h' });

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

  const existingUser = await userRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Simpan ke DB
  const user = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || 'CUSTOMER',
  });

  return user;
}
console.log('loginUser export =', loginUser);
module.exports = { registerUser, loginUser, logoutUser };

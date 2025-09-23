const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secret = process.env.JWT_SECRET || 'a5db4cbbf96136ec7f5b737735844955bc64d1aae0479efd2c3fdb7ea6d267c6';
  console.log('Using secret:', secret ? 'found' : 'not found');
  
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token tidak valid');
  }
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

const destroyToken = (token) => {
    console.log(`Token destroyed: ${token}`);
};

module.exports = {
    generateToken,
    verifyToken,
    decodeToken,
    destroyToken
};
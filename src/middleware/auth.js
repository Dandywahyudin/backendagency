
const { verifyToken } = require('../utils/jwt');
const prisma = require('../config/index').prisma;
const AppError = require('../errors/AppError');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(403).json({ message: 'Token tidak valid' });
  }
};

// Middleware untuk admin saja
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return next(new AppError('Akses ditolak. Hanya admin yang diizinkan.', 403));
  }
  next();
};

// Middleware untuk customer saja
const requireCustomer = (req, res, next) => {
  if (req.user.role !== 'CUSTOMER') {
    return next(new AppError('Akses ditolak. Hanya customer yang diizinkan.', 403));
  }
  next();
};

// Middleware untuk multiple roles
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(
        `Akses ditolak. Role yang diizinkan: ${roles.join(', ')}`, 
        403
      ));
    }
    next();
  };
};

module.exports = {
  authenticate,
  requireAdmin,
  requireCustomer,
  requireRole,
};
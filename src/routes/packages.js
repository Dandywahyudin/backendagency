const express = require('express');
const multer = require('multer');
const path = require('path');

const { 
  getAllPackages, 
  getPackageById, 
  createPackage, 
  updatePackage, 
  deletePackage,
  searchPackages,
  getPackagesStats
} = require('../controllers/packageController');

const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/packages'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // nama file unik
  },
});

const upload = multer({ storage });

// Public routes - bisa diakses tanpa authentication
router.get('/', getAllPackages);
router.get('/search', searchPackages);
router.get('/:id', getPackageById);

// Protected routes - butuh authentication
router.get('/admin/stats', authenticate, requireAdmin, getPackagesStats);

// Admin only routes - butuh role ADMIN
router.post('/create', authenticate, requireAdmin, upload.single('image'), createPackage);
router.get('/', authenticate, requireAdmin, getAllPackages);
router.get('/:id', authenticate, requireAdmin, getPackageById);
router.post('/update/:id', authenticate, requireAdmin, upload.single('image'), updatePackage);
router.delete('/:id', authenticate, requireAdmin, deletePackage);

module.exports = router;

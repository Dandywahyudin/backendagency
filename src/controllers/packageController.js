const packageService = require('../services/packageService');
const AppError = require('../errors/AppError');

const getAllPackages = async (req, res) => {
  const packages = await packageService.getAllPackages();
  
  res.json({
    success: true,
    message: 'Berhasil mengambil semua packages',
    data: { packages },
    count: packages.length
  });
}

const getPackageById = async (req, res) => {
  const package = await packageService.getPackageBySlug(req.params.id);
  
  res.json({
    success: true,
    message: 'Berhasil mengambil data package',
    data: { package }
  });
}

const createPackage = async (req, res, next) => {
  try {
    const newPackage = await packageService.createPackage(req.body, req.file);

    res.status(201).json({
      success: true,
      message: 'Package berhasil dibuat',
      data: newPackage,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return next(new AppError('Package dengan nama tersebut sudah ada', 400));
    }
    next(error);
  }
};

const updatePackage = async (req, res) => {
  const updatedPackage = await packageService.updatePackage(req.params.id, req.body);
  
  res.json({
    success: true,
    message: 'Package berhasil diupdate',
    data: { package: updatedPackage }
  });
};

const deletePackage = async (req, res) => {
  const result = await packageService.deletePackage(req.params.id);
  
  res.json({
    success: true,
    message: result.message,
    data: {}
  });
};

const searchPackages = async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({
      success: false,
      error: 'Parameter pencarian (q) harus diisi'
    });
  }

  const packages = await packageService.searchPackages(q);
  
  res.json({
    success: true,
    message: `Hasil pencarian untuk "${q}"`,
    data: { packages },
    count: packages.length
  });
};

const getPackagesStats = async (req, res) => {
  const packages = await packageService.getPackagesWithStats();
  
  res.json({
    success: true,
    message: 'Statistik packages berhasil diambil',
    data: { packages },
    count: packages.length
  });
};

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  searchPackages,
  getPackagesStats
};
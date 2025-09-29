const { json } = require('express');
const prisma = require('../config/database');
const AppError = require('../errors/AppError');
const fs = require('fs');

const getAllPackages = async() => {
    try {
      const packages = await prisma.package.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          features: true,
          createdAt: true,
          _count: {
            select: {
              orders: true
            }
          }
        }
      });

      return packages;
    } catch (error) {
      throw new AppError('Gagal mengambil data packages', 500);
    }
  }

  const getPackageById = async (id) => {
  try {
    // Pastikan id berupa angka
    const packageId = parseInt(id);
    if (isNaN(packageId)) {
      throw new AppError("ID package tidak valid", 400);
    }

    const package = await prisma.package.findUnique({
      where: { id: packageId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        slug: true,
        features: true,
        image: true,
        createdAt: true,
        orders: {
          select: {
            id: true,
            status: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { orders: true },
        },
      },
    });

    if (!package) {
      throw new AppError("Package tidak ditemukan", 404);
    }

    return package;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Gagal mengambil data package", 500);
  }
};


const createPackage = async (packageData, imageFile) => {
  const { name, description, price, slug } = packageData;
  let { features } = packageData;

  // jika features berupa string (FormData) parse jadi array
  if (typeof features === 'string') {
    try {
      features = JSON.parse(features);
    } catch (err) {
      features = [];
    }
  }

  if (!name || !price) {
    throw new AppError('Nama dan harga package harus diisi', 400);
  }

  if (price < 0) {
    throw new AppError('Harga tidak boleh negatif', 400);
  }

  if (!features || !Array.isArray(features) || features.length === 0) {
    throw new AppError('Harus ada fitur', 400);
  }

  const finalSlug = slug || generateSlugFromName(name);

  let imageUrl = null;
  if (imageFile) {
    imageUrl = `/uploads/packages/${imageFile.filename}`;
  }

  const created = await prisma.package.create({
    data: {
      name: name.trim(),
      description: description?.trim(),
      price: parseFloat(price),
      slug: finalSlug.trim(),
      features: features,
      image: imageUrl,
    },
  });

  return await prisma.package.findUnique({
    where: { id: created.id },
    include: {
      _count: { select: { orders: true } },
    },
  });
};

  const generateSlugFromName = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

const updatePackage = async (id, packageData) => {
  try {
    const { name, description, price, features, image } = packageData;

    // Cek package yang ada untuk menghapus gambar lama
    const existingPackage = await prisma.package.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingPackage) {
      throw new AppError("Package tidak ditemukan", 404);
    }

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (description) dataToUpdate.description = description;
    if (price) dataToUpdate.price = parseFloat(price);
    
    if (features) {
      // Service menerima features yang sudah di-parse atau masih string
      dataToUpdate.features = (typeof features === 'string') 
        ? JSON.parse(features) 
        : features;
    }

    // Jika controller mengirim path gambar baru
    if (image) {
      // Hapus gambar lama jika ada
      if (existingPackage.image) {
        const oldImagePath = `public${existingPackage.image}`; // Sesuaikan path folder public
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      dataToUpdate.image = image; // 'image' sudah berisi path dari controller
    }

    const updatedPackageResult = await prisma.package.update({
      where: { id: parseInt(id) },
      data: dataToUpdate,
      include: {
        _count: { select: { orders: true } },
      },
    });

    return updatedPackageResult;
  } catch (error) {
    // Error handling bisa diperkuat di sini atau di controller
    throw error;
  }
};


  const deletePackage = async(id) => {
    try {
      // Check if package exists
      const existingPackage = await prisma.package.findUnique({
        where: { id: parseInt(id) },
        include: {
          orders: {
            select: { id: true }
          }
        }
      });

      if (!existingPackage) {
        throw new AppError('Package tidak ditemukan', 404);
      }

      // Check if package has orders
      if (existingPackage.orders.length > 0) {
        throw new AppError('Tidak dapat menghapus package yang sudah memiliki order', 400);
      }

      await prisma.package.delete({
        where: { id: parseInt(id) }
      });

      return { message: 'Package berhasil dihapus' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      
      if (error.code === 'P2025') {
        throw new AppError('Package tidak ditemukan', 404);
      }
      
      throw new AppError('Gagal menghapus package', 500);
    }
  }

  const searchPackages = async(searchTerm) => {
    try {
      const packages = await prisma.package.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          ]
        },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          createdAt: true
        }
      });

      return packages;
    } catch (error) {
      throw new AppError('Gagal mencari packages', 500);
    }
  }

  const getPackagesWithStats = async() => {
    try {
      const packages = await prisma.package.findMany({
        include: {
          orders: {
            select: {
              id: true,
              status: true,
              createdAt: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      // Add statistics
      const packagesWithStats = packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        createdAt: pkg.createdAt,
        totalOrders: pkg.orders.length,
        completedOrders: pkg.orders.filter(order => order.status === 'COMPLETED').length,
        totalRevenue: pkg.orders.reduce((sum, order) => sum + parseFloat(pkg.price), 0)
      }));

      return packagesWithStats;
    } catch (error) {
      throw new AppError('Gagal mengambil statistik packages', 500);
    }
  }
module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
    searchPackages,
    getPackagesWithStats
};
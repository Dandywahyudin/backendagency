const prisma = require('../config/database'); // Sesuaikan path

const checkActiveOrder = async (userId, packageId) => {
  const activeOrder = await prisma.order.findFirst({
    where: {
      userId: userId,
      packageId: parseInt(packageId),
      // Cari order yang statusnya belum selesai atau dibatalkan
      status: {
        in: ['PENDING_PAYMENT'], 
      },
    },
  });

  // Kirim status order jika ditemukan, jika tidak kirim null
  return activeOrder; 
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    // 'include' sangat penting di sini
    include: {
      user: {
        select: {
          name: true, // Ambil nama user
        },
      },
      package: {
        select: {
          name: true, // Ambil nama paket
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // Tampilkan order terbaru di atas
    },
  });
};

module.exports = { checkActiveOrder, getAllOrders };
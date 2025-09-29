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

module.exports = { checkActiveOrder };
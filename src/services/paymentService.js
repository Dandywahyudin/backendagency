const prisma = require('../config/database'); // Sesuaikan path
const AppError = require('../errors/AppError'); // Asumsi Anda punya error handler

const createManualPayment = async (data) => {
  const { packageId, method, user, proofFile } = data;

  if (!proofFile) {
    throw new AppError('Bukti pembayaran wajib diunggah', 400);
  }

  const packageDetails = await prisma.package.findUnique({
    where: { id: parseInt(packageId) },
  });
  if (!packageDetails) {
    throw new AppError('Paket tidak ditemukan', 404);
  }
  
  // Membuat Order dengan status default PENDING_PAYMENT
  const newOrder = await prisma.order.create({
      data: {
          userId: user.id,
          packageId: packageDetails.id,
          // 'status' akan otomatis diisi 'PENDING_PAYMENT' oleh Prisma
      }
  });

  // Membuat Payment yang terhubung dengan Order
  const payment = await prisma.payment.create({
    data: {
      orderId: newOrder.id,
      amount: packageDetails.price,
      method: method,
      proof: `/uploads/proofs/${proofFile.filename}`,
      status: 'WAITING_VERIFICATION',
    },
  });

  return { order: newOrder, payment };
};

module.exports = { createManualPayment };
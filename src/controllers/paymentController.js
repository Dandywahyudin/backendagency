const paymentService = require('../services/paymentService');

const submitPayment = async (req, res, next) => {
  try {
    const paymentData = {
      packageId: req.body.packageId,
      method: req.body.method,
      user: req.user,       // Diambil dari middleware 'protect'
      proofFile: req.file,  // Diambil dari middleware 'multer'
    };
    
    await paymentService.createManualPayment(paymentData);

    res.status(201).json({
      success: true,
      message: 'Bukti pembayaran berhasil dikirim dan sedang menunggu verifikasi.',
    });
  } catch (error) {
    next(error); // Teruskan ke error handler
  }
};

module.exports = { submitPayment };
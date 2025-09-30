const orderService = require('../services/orderService');

const getOrderStatus = async (req, res, next) => {
  try {
    const userId = req.user.id; // Dari middleware autentikasi
    const { packageId } = req.query; // Ambil packageId dari query URL

    if (!packageId) {
      return res.status(400).json({ message: 'Package ID diperlukan' });
    }

    const activeOrder = await orderService.checkActiveOrder(userId, packageId);

    if (activeOrder) {
      // Jika ada order aktif, kirim statusnya
      res.json({
        hasActiveOrder: true,
        status: activeOrder.status,
      });
    } else {
      // Jika tidak ada
      res.json({
        hasActiveOrder: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({
      status: 'success',
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get orders' });
  }
};

module.exports = { getOrderStatus, getAllOrders };
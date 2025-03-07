const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
  getAllOrders,
  getOrderById,
  getOrders,
  createOrder,
  updateOrderStatus,
  getOrderStatistics,
} = require('../controllers/orderController');

// Customer routes
router.get('/me', auth, getOrders);
router.post('/', auth, createOrder);

// Admin routes
router.get('/', auth, isAdmin, getAllOrders);
router.get('/:id', auth, isAdmin, getOrderById);
router.put('/:id/status', auth, isAdmin, updateOrderStatus);
router.get('/statistics', auth, isAdmin, getOrderStatistics);

module.exports = router; 
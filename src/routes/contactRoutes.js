const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', auth, isAdmin, getAllContacts);
router.get('/:id', auth, isAdmin, getContactById);
router.put('/:id/status', auth, isAdmin, updateContactStatus);
router.delete('/:id', auth, isAdmin, deleteContact);

module.exports = router; 
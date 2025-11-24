const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.get('/suppliers', verifyToken, verifyRole(['admin']), adminController.getAllSuppliers);
router.delete('/remove-supplier/:id', verifyToken, verifyRole(['admin']), adminController.deleteSupplier);
router.get('/billing', verifyToken, verifyRole(['admin']), adminController.getBilling);

module.exports = router;

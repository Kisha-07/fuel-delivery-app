const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// Note: In our auth logic, suppliers are stored in 'suppliers' table but we might need to adjust role checking.
// For simplicity, let's assume the token contains role='supplier'.

router.get('/orders', verifyToken, verifyRole(['supplier']), supplierController.getOrders);
router.patch('/order/:id/confirm', verifyToken, verifyRole(['supplier']), supplierController.confirmOrder);
router.patch('/order/:id/update-location', verifyToken, verifyRole(['supplier']), supplierController.updateLocation);

module.exports = router;

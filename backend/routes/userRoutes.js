const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.get('/fuels', verifyToken, userController.getFuels);
router.post('/order', verifyToken, verifyRole(['user']), userController.placeOrder);
router.get('/order/history', verifyToken, verifyRole(['user']), userController.getOrderHistory);
router.get('/order/:id/track', verifyToken, verifyRole(['user']), userController.trackOrder);

module.exports = router;

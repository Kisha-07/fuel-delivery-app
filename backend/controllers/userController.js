const db = require('../config/db');

exports.getFuels = async (req, res) => {
    // In a real app, this might come from a fuels table or config.
    // For now, we'll return hardcoded types or available stock from suppliers.
    res.json(['Diesel', 'Petrol', 'CNG']);
};

exports.placeOrder = async (req, res) => {
    const { fuel_type, quantity, delivery_address, delivery_date } = req.body;
    const userId = req.user.id;

    try {
        const [result] = await db.query(
            'INSERT INTO orders (user_id, fuel_type, quantity, delivery_address, delivery_date) VALUES (?, ?, ?, ?, ?)',
            [userId, fuel_type, quantity, delivery_address, delivery_date]
        );
        res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOrderHistory = async (req, res) => {
    const userId = req.user.id;
    try {
        const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.trackOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const [delivery] = await db.query('SELECT * FROM deliveries WHERE order_id = ?', [orderId]);
        if (delivery.length === 0) {
            return res.status(404).json({ message: 'Tracking info not available yet' });
        }
        res.json(delivery[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

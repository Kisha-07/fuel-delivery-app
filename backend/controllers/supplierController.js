const db = require('../config/db');

exports.getOrders = async (req, res) => {
    // In a real app, we would filter by supplier ID if orders were assigned to them.
    // For this simple version, suppliers see all pending orders or orders assigned to them.
    // Let's assume suppliers can see pending orders to pick them up, or orders assigned to them.
    const supplierId = req.user.id; // Assuming supplier logs in and has an ID
    try {
        // Show orders assigned to this supplier OR unassigned pending orders
        const [orders] = await db.query(
            'SELECT * FROM orders WHERE supplier_id = ? OR (supplier_id IS NULL AND status = "pending")',
            [supplierId]
        );
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.confirmOrder = async (req, res) => {
    const orderId = req.params.id;
    const supplierId = req.user.id;

    try {
        await db.query('UPDATE orders SET status = "confirmed", supplier_id = ? WHERE id = ?', [supplierId, orderId]);

        // Create initial delivery record
        await db.query('INSERT INTO deliveries (order_id, status, current_location) VALUES (?, "scheduled", "Warehouse")', [orderId]);

        res.json({ message: 'Order confirmed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateLocation = async (req, res) => {
    const orderId = req.params.id;
    const { location, status } = req.body;

    try {
        await db.query(
            'UPDATE deliveries SET current_location = ?, status = ? WHERE order_id = ?',
            [location, status, orderId]
        );

        if (status === 'delivered') {
            await db.query('UPDATE orders SET status = "delivered", payment_status = "paid" WHERE id = ?', [orderId]);
        }

        res.json({ message: 'Location updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

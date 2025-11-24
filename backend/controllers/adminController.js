const db = require('../config/db');

exports.getAllSuppliers = async (req, res) => {
    try {
        const [suppliers] = await db.query('SELECT id, company_name, email, location, fuel_stock FROM suppliers');
        res.json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addSupplier = async (req, res) => {
    // This might be redundant if suppliers register themselves, but admins can also add them.
    // Reusing auth logic or simple insert.
    // For now, let's say admins just view them.
    res.status(501).json({ message: 'Not implemented yet, use register endpoint' });
};

exports.deleteSupplier = async (req, res) => {
    const supplierId = req.params.id;
    try {
        await db.query('DELETE FROM suppliers WHERE id = ?', [supplierId]);
        res.json({ message: 'Supplier removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBilling = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT SUM(quantity) as total_fuel, SUM(quantity * 100) as total_revenue FROM orders WHERE payment_status = "paid"');
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const db = require('../config/db');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        console.log('Seeding database...');

        // Hash passwords
        const userPassword = await bcrypt.hash('user123', 10);
        const adminPassword = await bcrypt.hash('admin123', 10);
        const supplierPassword = await bcrypt.hash('supplier123', 10);

        // Clear existing data (optional, be careful in prod)
        // await db.query('DELETE FROM deliveries');
        // await db.query('DELETE FROM orders');
        // await db.query('DELETE FROM users');
        // await db.query('DELETE FROM suppliers');

        // Insert Admin
        await db.query(
            'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
            ['Admin User', 'admin@fda.com', adminPassword, 'admin', '0000000000', 'Admin HQ']
        );
        console.log('Admin inserted');

        // Insert Users
        await db.query(
            'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
            ['John Doe', 'john@example.com', userPassword, 'user', '1234567890', '123 Main St']
        );
        await db.query(
            'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
            ['Jane Smith', 'jane@example.com', userPassword, 'user', '0987654321', '456 Elm St']
        );
        console.log('Users inserted');

        // Insert Suppliers
        await db.query(
            'INSERT INTO suppliers (company_name, email, password, location, phone, fuel_stock) VALUES (?, ?, ?, ?, ?, ?)',
            ['FuelCo Ltd', 'supplier@fuelco.com', supplierPassword, 'Downtown Depot', '1112223333', 5000.00]
        );
        await db.query(
            'INSERT INTO suppliers (company_name, email, password, location, phone, fuel_stock) VALUES (?, ?, ?, ?, ?, ?)',
            ['Energy Plus', 'supplier@energyplus.com', supplierPassword, 'Uptown Warehouse', '4445556666', 3000.00]
        );
        console.log('Suppliers inserted');

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();

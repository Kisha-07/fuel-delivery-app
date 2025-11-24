const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role, company_name, location, phone } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'supplier') {
            await db.query(
                'INSERT INTO suppliers (company_name, email, password, location, phone) VALUES (?, ?, ?, ?, ?)',
                [company_name || name, email, hashedPassword, location, phone]
            );
        } else {
            await db.query(
                'INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)',
                [name, email, hashedPassword, role || 'user', phone]
            );
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'supplier') {
            const [rows] = await db.query('SELECT * FROM suppliers WHERE email = ?', [email]);
            user = rows[0];
        } else {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role || 'user']);
            user = rows[0];
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: role || user.role },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user.id, name: user.name || user.company_name, role: role || user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

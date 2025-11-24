const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/authRoutes');
const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock DB
jest.mock('../config/db', () => ({
    query: jest.fn()
}));

const db = require('../config/db');
const bcrypt = require('bcrypt');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        db.query.mockResolvedValueOnce([{ insertId: 1 }]); // Mock insert success
        bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword');

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'user',
                phone: '1234567890'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should login a user', async () => {
        const mockUser = {
            id: 1,
            name: 'Test User',
            email: 'test@example.com',
            password: 'hashedpassword',
            role: 'user'
        };

        db.query.mockResolvedValueOnce([[mockUser]]); // Mock find user
        bcrypt.compare = jest.fn().mockResolvedValue(true); // Mock password match

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});

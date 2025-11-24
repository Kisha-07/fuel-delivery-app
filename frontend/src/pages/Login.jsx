import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'user' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            login(res.data.user, res.data.token);
            if (res.data.user.role === 'admin') navigate('/admin-dashboard');
            else if (res.data.user.role === 'supplier') navigate('/supplier-dashboard');
            else navigate('/user-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select name="role" className="form-control" onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="supplier">Supplier</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;

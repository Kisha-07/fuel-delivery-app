import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user', phone: '', address: '', company_name: '', location: '' });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Role</label>
                    <select name="role" className="form-control" onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="supplier">Supplier</option>
                    </select>
                </div>
                {formData.role === 'user' ? (
                    <>
                        <div className="mb-3"><label>Name</label><input type="text" name="name" className="form-control" onChange={handleChange} required /></div>
                    </>
                ) : (
                    <>
                        <div className="mb-3"><label>Company Name</label><input type="text" name="company_name" className="form-control" onChange={handleChange} required /></div>
                        <div className="mb-3"><label>Location</label><input type="text" name="location" className="form-control" onChange={handleChange} required /></div>
                    </>
                )}
                <div className="mb-3"><label>Email</label><input type="email" name="email" className="form-control" onChange={handleChange} required /></div>
                <div className="mb-3"><label>Password</label><input type="password" name="password" className="form-control" onChange={handleChange} required /></div>
                <div className="mb-3"><label>Phone</label><input type="text" name="phone" className="form-control" onChange={handleChange} required /></div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;

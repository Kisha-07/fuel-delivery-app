import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
    const [fuels, setFuels] = useState([]);
    const [order, setOrder] = useState({ fuel_type: '', quantity: '', delivery_address: '', delivery_date: '' });
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchFuels();
        fetchHistory();
    }, []);

    const fetchFuels = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/fuels');
            setFuels(res.data);
            if (res.data.length > 0) setOrder(prev => ({ ...prev, fuel_type: res.data[0] }));
        } catch (err) {
            console.error(err);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/order/history');
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/user/order', order);
            setMessage('Order placed successfully!');
            fetchHistory();
        } catch (err) {
            setMessage('Failed to place order');
        }
    };

    return (
        <div className="container mt-4">
            <h2>User Dashboard</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card p-3 mb-3">
                        <h4>Place Order</h4>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Fuel Type</label>
                                <select name="fuel_type" className="form-control" onChange={handleChange}>
                                    {fuels.map((f, i) => <option key={i} value={f}>{f}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label>Quantity (Liters)</label>
                                <input type="number" name="quantity" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label>Address</label>
                                <input type="text" name="delivery_address" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label>Date</label>
                                <input type="date" name="delivery_date" className="form-control" onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success">Order Now</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-3">
                        <h4>Order History</h4>
                        <ul className="list-group">
                            {history.map(o => (
                                <li key={o.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{o.fuel_type} - {o.quantity}L - {o.status}</span>
                                    <Link to={`/order/${o.id}/track`} className="btn btn-sm btn-info">Track</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

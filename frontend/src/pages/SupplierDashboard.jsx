import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupplierDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/supplier/orders');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const confirmOrder = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/api/supplier/order/${id}/confirm`);
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const updateLocation = async (id) => {
        const location = prompt("Enter current location:");
        if (location) {
            try {
                await axios.patch(`http://localhost:5000/api/supplier/order/${id}/update-location`, { location, status: 'in_transit' });
                alert('Location updated');
            } catch (err) {
                console.error(err);
            }
        }
    };

    const markDelivered = async (id) => {
        if (window.confirm("Mark as delivered?")) {
            try {
                await axios.patch(`http://localhost:5000/api/supplier/order/${id}/update-location`, { location: 'Delivered', status: 'delivered' });
                fetchOrders();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Supplier Dashboard</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fuel</th>
                        <th>Qty</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.fuel_type}</td>
                            <td>{o.quantity}</td>
                            <td>{o.delivery_address}</td>
                            <td>{o.status}</td>
                            <td>
                                {o.status === 'pending' && <button className="btn btn-primary btn-sm" onClick={() => confirmOrder(o.id)}>Confirm</button>}
                                {o.status === 'confirmed' && <button className="btn btn-warning btn-sm" onClick={() => updateLocation(o.id)}>Update Loc</button>}
                                {(o.status === 'confirmed' || o.status === 'in_transit') && <button className="btn btn-success btn-sm ms-2" onClick={() => markDelivered(o.id)}>Delivered</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupplierDashboard;

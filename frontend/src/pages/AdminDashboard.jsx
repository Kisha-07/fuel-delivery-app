import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [billing, setBilling] = useState(null);

    useEffect(() => {
        fetchSuppliers();
        fetchBilling();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/suppliers');
            setSuppliers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBilling = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/billing');
            setBilling(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const removeSupplier = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/remove-supplier/${id}`);
                fetchSuppliers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <h4>Billing Overview</h4>
                    {billing ? (
                        <p>Total Fuel Sold: {billing.total_fuel || 0}L | Total Revenue: ${billing.total_revenue || 0}</p>
                    ) : <p>Loading...</p>}
                </div>
            </div>

            <h4>Manage Suppliers</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(s => (
                        <tr key={s.id}>
                            <td>{s.company_name}</td>
                            <td>{s.email}</td>
                            <td>{s.location}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => removeSupplier(s.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;

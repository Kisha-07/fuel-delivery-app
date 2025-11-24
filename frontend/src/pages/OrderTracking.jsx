import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderTracking = () => {
    const { id } = useParams();
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTrackingInfo();
        const interval = setInterval(fetchTrackingInfo, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [id]);

    const fetchTrackingInfo = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/user/order/${id}/track`);
            setTrackingInfo(res.data);
            setError('');
        } catch (err) {
            setError('Tracking information not available yet or order not found.');
        }
    };

    return (
        <div className="container mt-5">
            <Link to="/user-dashboard" className="btn btn-secondary mb-3">Back to Dashboard</Link>
            <h2>Order Tracking (ID: {id})</h2>
            {error ? (
                <div className="alert alert-warning">{error}</div>
            ) : trackingInfo ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Status: <span className="badge bg-primary">{trackingInfo.status}</span></h5>
                        <p className="card-text"><strong>Driver:</strong> {trackingInfo.driver_name || 'Assigned soon'}</p>
                        <p className="card-text"><strong>Vehicle:</strong> {trackingInfo.vehicle_number || 'Assigned soon'}</p>
                        <p className="card-text"><strong>Current Location:</strong> {trackingInfo.current_location}</p>
                        <div className="progress mt-3">
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar"
                                style={{ width: trackingInfo.status === 'delivered' ? '100%' : trackingInfo.status === 'in_transit' ? '75%' : '25%' }}
                            ></div>
                        </div>
                        <small className="text-muted mt-2 d-block">Updates automatically every 5 seconds.</small>
                    </div>
                </div>
            ) : (
                <p>Loading tracking info...</p>
            )}
        </div>
    );
};

export default OrderTracking;

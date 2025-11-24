import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OrderTracking from './pages/OrderTracking';

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user-dashboard" element={<PrivateRoute roles={['user']}><UserDashboard /></PrivateRoute>} />
                    <Route path="/order/:id/track" element={<PrivateRoute roles={['user']}><OrderTracking /></PrivateRoute>} />
                    <Route path="/supplier-dashboard" element={<PrivateRoute roles={['supplier']}><SupplierDashboard /></PrivateRoute>} />
                    <Route path="/admin-dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

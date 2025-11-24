import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Fuel Delivery</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {!user ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><span className="nav-link">Hello, {user.name}</span></li>
                                {user.role === 'user' && <li className="nav-item"><Link className="nav-link" to="/user-dashboard">Dashboard</Link></li>}
                                {user.role === 'supplier' && <li className="nav-item"><Link className="nav-link" to="/supplier-dashboard">Dashboard</Link></li>}
                                {user.role === 'admin' && <li className="nav-item"><Link className="nav-link" to="/admin-dashboard">Dashboard</Link></li>}
                                <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

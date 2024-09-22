import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderComponent.css';

function HeaderComponent({ role }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <header className="header">
            <h1>Odeon Airlines</h1>
            {role === 'ADMIN' ? (
                <nav>
                    <a href="/admin-dashboard">Admin Dashboard</a>
                    <a href="#" onClick={handleLogout} className="logout-link">Logout</a>
                </nav>
            ) : role === 'USER' ? (
                <nav>
                    <a href="/user-dashboard">User Dashboard</a>
                    <a href="#" onClick={handleLogout} className="logout-link">Logout</a>
                </nav>
            ) : (
                <nav>
                    <a href="/login">Logout</a>
                </nav>
            )}
        </header>
    );
}

export default HeaderComponent;

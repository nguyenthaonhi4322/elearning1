import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 

function Header({ user, onLogout }) {
    
    const handleLocalLogout = () => {
        if (onLogout) onLogout();
    };

    return (
        <div className="fixed-header-wrapper">
            <header className="main-header">
                <Link to="/dashboard" className="app-logo">
                    E-learning System
                </Link>

                <nav className="nav-links">
                    <Link to="/dashboard" className="nav-item">Bài học</Link> 
                    
                    <Link to="/tutors/scores" className="nav-item">Xem Điểm</Link> 

                    {user && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span className="user-greeting">
                                Xin chào, {user}!
                            </span>
                            <button 
                                onClick={handleLocalLogout} 
                                className="logout-button"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </nav>
            </header>
        </div>
    );
}

export default Header;
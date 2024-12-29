// Header.jsx
import React, { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

function Header() {
  const { userEmail, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header-container">
      <div className="header-top">
        <div className="header-left">
            <div className="user-group">
            {userEmail ? (
                <>
                <span
                  className="user-status">Hello, <span className="user-name">{userEmail}</span>
                </span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                <button className="login-button" onClick={() => navigate('/login')}>Login</button>
                <button className="register-button" onClick={() => navigate('/register')}>Register</button>
                </>
            )}
            </div>
        </div>

        <div className="header-center" onClick={() => navigate('/')}>
          <h1 className="header-title">Skubestore</h1>
        </div>
      </div>

      <div className="header-nav">
       <NavLink to="/" className="nav-link">Home Page</NavLink>
        <NavLink to="/products" className="nav-link">Products</NavLink>
        <NavLink to="/about" className="nav-link">About Us</NavLink>
        <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
      </div>
    </header>
  );
}

export default Header;

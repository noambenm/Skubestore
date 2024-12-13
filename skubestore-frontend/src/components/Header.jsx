import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/');
  };

  return (
    <header className="header-container">
      <div className="header-top">
        <div className="header-left">
            <div className="user-group">
            {userEmail ? (
                <>
                <span className="user-status">Logged in as {userEmail}</span>
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

        <div className="header-right">
          {/* Additional elements can go here if needed, or leave empty for symmetry */}
        </div>
      </div>

      <div className="header-nav">
       <NavLink to="/" className="nav-link">Home Page</NavLink>
        <NavLink to="/products" className="nav-link">Products</NavLink>
        <NavLink to="/about" className="nav-link">About Us</NavLink>
        <NavLink to="/contact" className="nav-link">Contact Us</NavLink>
        {/* Add more nav links as needed */}
      </div>
    </header>
  );
}

export default Header;

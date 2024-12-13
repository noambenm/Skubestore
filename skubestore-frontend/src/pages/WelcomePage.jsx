import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
  };

  return (
    <div className="container">
      <div className="header-center">
        <h1 className="title">Skubestore</h1>
        <p className="subtitle">Your one-stop shop for all your Skube Diving equipment needs!</p>
      </div>
      <div className="user-status-group">
        {userEmail ? (
          <>
            <div className="user-status">Logged in as {userEmail}</div>
            <button className="user-button logout-button" onClick={handleLogout}>Logout</button>        
          </>
        ) : (
          <>
            <button className="user-button login-button" onClick={() => navigate('/login')}>Login</button>
            <button className="user-button login-button" onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
      <div className="button-group">
        {(
          <>
            <button className="welcome-button" onClick={() => navigate('/products')}>View Products</button>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;

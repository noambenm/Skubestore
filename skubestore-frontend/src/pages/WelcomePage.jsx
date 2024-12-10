import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Import the CSS file

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
    <div className="welcome-container">
      <h1 className="welcome-title">Skubestore</h1>
      <p className="welcome-subtitle">Your one-stop shop for all your Skube Diving equipment needs!</p>

      {userEmail ? (
        <div className="button-group">
          <p className="user-status">Logged in as {userEmail}</p>
          <button className="welcome-button" onClick={() => navigate('/products')}>View Products</button>
          <button className="welcome-button logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="button-group">
          <button className="welcome-button" onClick={() => navigate('/products')}>View Products</button>
          <button className="welcome-button" onClick={() => navigate('/register')}>Register</button>
          <button className="welcome-button" onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;

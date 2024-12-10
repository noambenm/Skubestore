import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Skubestore</h1>
      <p>Your one-stop shop for all your Skube Diving equipment needs!</p>

      {userEmail ? (
        <div style={{ marginTop: '20px' }}>
          <p>Logged in as {userEmail}</p>
          <button onClick={() => navigate('/products')} style={{ marginRight: '10px' }}>
            View Products
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => navigate('/products')} style={{ marginRight: '10px' }}>
            View Products
          </button>
          <button onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>
            Register
          </button>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
    </div>
  );
}

export default WelcomePage;

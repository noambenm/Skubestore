import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Skubestore</h1>
      <p>Your one-stop shop for all your Skube Diving equipment needs!</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/products')} style={{ marginRight: '10px' }}>
          View Products
        </button>
        <button onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>
          Register
        </button>
        <button onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;

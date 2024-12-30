import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      alert(response.message);
      login(email);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="register-button" type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;

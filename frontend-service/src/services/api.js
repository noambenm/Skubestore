import axios from 'axios';

// Base URLs for your microservices
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';


// User Service APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${VITE_BACKEND_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${VITE_BACKEND_URL}/login`, credentials);
  // Save user email to local storage for simplicity
  localStorage.setItem('userEmail', response.data.user.email);
  return response.data;
};

// Product Service APIs
export const getProducts = async () => {
  const response = await axios.get(`${VITE_BACKEND_URL}/products/view`);
  return response.data;
};

// Order Service APIs
export const placeOrder = async (orderData) => {
  const response = await axios.post(`${VITE_BACKEND_URL}/orders/place`, orderData);
  return response.data;
};

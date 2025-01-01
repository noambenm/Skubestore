import axios from 'axios';

// Base URLs for your microservices
export const VITE_USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || '';
export const VITE_PRODUCT_SERVICE_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL || '';
export const VITE_ORDER_SERVICE_URL = import.meta.env.VITE_ORDER_SERVICE_URL || '';


// User Service APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${VITE_USER_SERVICE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${VITE_USER_SERVICE_URL}/login`, credentials);
  // Save user email to local storage for simplicity
  localStorage.setItem('userEmail', response.data.user.email);
  return response.data;
};

// Product Service APIs
export const getProducts = async () => {
  const response = await axios.get(`${VITE_PRODUCT_SERVICE_URL}/products/view`);
  return response.data;
};

// Order Service APIs
export const placeOrder = async (orderData) => {
  const response = await axios.post(`${VITE_ORDER_SERVICE_URL}/orders/place`, orderData);
  return response.data;
};

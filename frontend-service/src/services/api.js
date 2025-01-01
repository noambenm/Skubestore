import axios from 'axios';

// Point directly to the internal Ingress URL
// Adjust if needed for your environment
const BASE_URL = 'https://api.skubestore.click';

// User Service APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  // Save user email to local storage
  localStorage.setItem('userEmail', response.data.user.email);
  return response.data;
};

// Product Service APIs
export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products/view`);
  return response.data;
};

// Order Service APIs
export const placeOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/orders/place`, orderData);
  return response.data;
};

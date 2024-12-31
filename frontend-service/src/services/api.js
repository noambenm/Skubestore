import axios from 'axios';

// Base URLs for your microservices
export const USER_SERVICE_URL = "skubestore.click/register"
export const PRODUCT_SERVICE_URL = "skubestore.click/products"
export const ORDER_SERVICE_URL = "skubestore.click/orders"


// User Service APIs
export const registerUser = async (userData) => {
  const response = await axios.post(`${USER_SERVICE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${USER_SERVICE_URL}/login`, credentials);
  // Save user email to local storage for simplicity
  localStorage.setItem('userEmail', response.data.user.email);
  return response.data;
};

// Product Service APIs
export const getProducts = async () => {
  const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/view`);
  return response.data;
};

// Order Service APIs
export const placeOrder = async (orderData) => {
  const response = await axios.post(`${ORDER_SERVICE_URL}/orders/place`, orderData);
  return response.data;
};

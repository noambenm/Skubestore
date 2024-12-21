import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/api';
import './OrderPage.css'; // Import the CSS file

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    const total_price = product.price * quantity;
    try {
      const response = await placeOrder({
        email: localStorage.getItem('userEmail'),
        product_name: product.name,
        quantity,
        total_price,
      });
      alert(response.message);
      navigate('/products');
    } catch (error) {
      alert(error.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="order-container">
      <div className="order-card">
        <h2 className="order-title">Order {product.name}</h2>
        <p className="order-price">Price per unit: ${product.price}</p>
        <div className="quantity-section">
          <label className="quantity-label" htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input"
          />
        </div>
        <button className="order-button" onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default OrderPage;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { placeOrder } from '../services/api';

function OrderPage() {
  const location = useLocation();
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
    } catch (error) {
      alert(error.response.data.message || 'Order failed');
    }
  };

  return (
    <div>
      <h2>Order {product.name}</h2>
      <p>Price per unit: ${product.price}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      /><br />
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}

export default OrderPage;

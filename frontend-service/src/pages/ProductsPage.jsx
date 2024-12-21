import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css'; // Import the new CSS file

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    navigate('/order', { state: { product } });
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Our Products</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-description">{p.description}</p>
            <p className="product-price">Price: ${p.price}</p>
            <button className="order-button" onClick={() => handleOrder(p)}>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;

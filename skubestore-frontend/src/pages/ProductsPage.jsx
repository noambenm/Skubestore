import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Price: ${p.price}</p>
          <button onClick={() => handleOrder(p)}>Order Now</button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;

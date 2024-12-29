import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="home-title">Welcome to Skubestore</h1>
        <p className="home-tagline">
          Your one-stop shop for premium scuba diving equipment and accessories!
        </p>
        <button 
          className="explore-button" 
          onClick={() => navigate('/products')}
        >
          Explore Products
        </button>
      </div>
    </div>
  );
}

export default HomePage;

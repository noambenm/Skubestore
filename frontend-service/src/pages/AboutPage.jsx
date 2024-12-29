import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="page-container about-container">
      <h2 className="page-title">About Us</h2>
      <p className="page-subtitle">
        We are passionate divers and developers behind Skubestore.
      </p>

      <div className="profile-section">
        {/* Example: local image reference or external URL */}
        <img
          className="profile-image"
          src="/assets/images/profile.jpg"  // or an external link
          alt="Me and My Partner"
        />
        <div className="profile-description">
          <p>
            Welcome to Skubestore! We’re two enthusiasts who love exploring 
            the underwater world. Through Skubestore, we aim to provide 
            the best diving gear and a platform for fellow divers to share 
            experiences.
          </p>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

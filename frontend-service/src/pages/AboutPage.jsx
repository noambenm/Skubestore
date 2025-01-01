import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="page-container about-container">
      <h2 className="page-title">About Skubestore</h2>
      <p className="page-subtitle">Where Passion for Diving Meets Modern Development</p>

      <div className="about-content">
        <p>
          Skubestore is the brainchild of two diving enthusiasts who wanted to bring
          high-quality equipment to fellow divers around the world. We believe in combining
          our love of the underwater realm with the latest in web technology to create
          a platform that’s both inspiring and easy to use.
        </p>
        <p>
          From wetsuits and regulators to cameras and accessories, each product is carefully
          reviewed by our team. Our mission is simple: help you explore the depths with
          confidence and excitement. 
        </p>
        <p>
          Alongside building this e-commerce experience, we’re dedicated to demonstrating
          best practices in microservices, containerization, and continuous deployment. We
          welcome you to explore Skubestore and join us on this diving and development adventure!
        </p>
      </div>

      <div className="about-quote">
        <p>
          “The ocean stirs the heart, inspires the imagination, and brings eternal joy
          to the soul.” – Wyland
        </p>
      </div>
    </div>
  );
}

export default AboutPage;

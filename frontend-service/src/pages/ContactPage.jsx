import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="page-container contact-container">
      <h2 className="page-title">Contact Us</h2>
      <p className="page-subtitle">We’d love to hear from you!</p>

      <div className="contact-info">
        <p>
          Have questions or need help? Our dedicated support team is here for you.
        </p>
        <ul>
          <li>Email: support@skubestore.click</li>
          <li>Phone: +972 541337420</li>
          <li>Address: 123 Ocean Avenue, Neptune City</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="contact-input"
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <input
          className="contact-input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <textarea
          className="contact-textarea"
          name="message"
          placeholder="Message"
          required
        />
        <button className="contact-button" type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactPage;

import React from 'react';
import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>Feel free to reach out through any of the methods below:</p>
      <div className="contact-info">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href="mailto:shahaayushi2003@gmail.com">shahaayushi2003@gmail.com</a>
        </div>
        <div className="contact-item">
          <FaLinkedin className="contact-icon" />
          <a href="https://www.linkedin.com/in/aayushi-shah-2353931ab/" target="_blank" rel="noopener noreferrer">
            LinkedIn Profile
          </a>
        </div>
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <a href="tel:+780 938 2328">+1 (780) 938-2328</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
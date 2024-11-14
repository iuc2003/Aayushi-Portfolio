import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Heading = () => {
  return (
    <header className="header">
      <img src={logo} alt="My Logo" className="logo" />
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>

        </ul>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/aayushi-shah-2353931ab/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </nav>
    </header>
  );
};

export default Heading;
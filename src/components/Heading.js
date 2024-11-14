import React from 'react';
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
    
      </nav>
    </header>
  );
};

export default Heading;
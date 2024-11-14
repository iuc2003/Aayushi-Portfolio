import React from 'react';
import profilePicture from '../assets/profile_picture.heic'; 
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Home = () => {
  return (
    <section id="home" className="home">
      <div className="home-content">
        <div className="intro">
          <h1>Aayushi Shah</h1>
          <p>University of Alberta</p>
          <p>    </p>
          <p>Software Developer</p>
          {/*<button className="hire-me-button">Hire Me</button>*/}
          <div className="social-links">
            <a href="https://www.linkedin.com/in/aayushi-shah-2353931ab/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/iuc2003" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="profile-pic-container">
          <img src={profilePicture} alt="Your Profile" className="profile-pic" />
        </div>
      </div>
    </section>
  );
};

export default Home;
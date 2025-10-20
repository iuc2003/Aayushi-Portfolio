import React, { useEffect, useRef, useState } from 'react';
import profilePicture from '../assets/profile_picture.heic'; 
import profile2 from '../assets/profile_picture_2.jpg';     // add more images
import profile3 from '../assets/profile_picture_3.jpg';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './Home.css';

const IMAGES = [profilePicture, profile2, profile3].filter(Boolean); 
const INTERVAL_MS = 3000; 
const FLIP_DURATION_MS = 700;

const Home = () => {
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState(IMAGES.length > 1 ? 1 : 0);
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (IMAGES.length < 2) return; // nothing to flip if single image

    const start = () => {
      timerRef.current = setInterval(() => {
        setBackIdx((prev) => {
          // next image after the one currently visible on front
          const next = (frontIdx + 1) % IMAGES.length;
          return next;
        });
        setIsFlipped(true);

        // after flip animation ends, swap indices and unflip
        setTimeout(() => {
          setFrontIdx((cur) => (cur + 1) % IMAGES.length);
          setIsFlipped(false);
        }, FLIP_DURATION_MS);
      }, INTERVAL_MS);
    };

    start();
    return () => clearInterval(timerRef.current);
    // frontIdx is intentionally included so the sequence stays correct
  }, [frontIdx]);

  return (
    <section id="home" className="home">
      <div className="home-content">
        <div className="intro">
          <h1>Aayushi Shah</h1>
          <p>University of Alberta</p>
          <p>Software Developer</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/aayushi-shah-2353931ab/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/iuc2003" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Flip card profile */}
        <div className="profile-pic-container pf-card" aria-label="Profile pictures carousel">
          <div className={`pf-inner ${isFlipped ? 'is-flipped' : ''}`}>
            {/* FRONT */}
            <div className="pf-face pf-front">
              <img src={IMAGES[frontIdx]} alt="Profile" className="profile-pic" />
            </div>
            {/* BACK (preloaded with next) */}
            <div className="pf-face pf-back">
              <img src={IMAGES[backIdx]} alt="Profile" className="profile-pic" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
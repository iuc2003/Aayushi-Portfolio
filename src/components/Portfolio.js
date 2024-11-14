import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="circle" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
        <span>Personal Projects</span>
      </div>
      <div className="circle" onClick={() => document.getElementById("experience").scrollIntoView({ behavior: "smooth" })}>
        <span>Work Experience</span>
      </div>
      <div className="circle" onClick={() => document.getElementById("skills").scrollIntoView({ behavior: "smooth" })}>
        <span>Skills</span>
      </div>
    </section>
  );
};

export default Portfolio;
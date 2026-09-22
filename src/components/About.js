import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-header">
        <span className="about-kicker"></span>
        <h2>About Me</h2>
      </div>

      <div className="about-card">
        <p className="about-text">
          Hi, I'm <span className="shiny-text">Aayushi</span> — a Computer Science student at the University of Alberta with a software engineering background and a growing obsession with the product side of building things. I started out writing code, but somewhere along the way I realized I care more about <span className="highlight-pill">why we're building something</span> than just how — which is what pulled me toward product and program management.
        </p>

        <p className="about-text">
          Today, I work as an <span className="shiny-text blue">Engineer-turned-TPM</span>, combining strong technical fundamentals with an impact-first, design-conscious mindset to lead cross-functional initiatives across insurance and banking on platforms serving <span className="highlight-pill success">200M+ customers</span>.
        </p>

        <p className="about-text">
          Outside of work, I'm a <span className="shiny-text gold">Grace Hopper Conference speaker (2026)</span> and an active leader in women-in-tech communities like <span className="bold-tech">Rewriting the Code</span> and <span className="bold-tech">AnitaB.org</span> — because building great products and building up the people building them go hand in hand.
        </p>

      </div>
    </section>
  );
};

export default About;
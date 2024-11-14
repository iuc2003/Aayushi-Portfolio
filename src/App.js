import React, { useState, useEffect } from 'react'; 
import Heading from './components/Heading';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Experience from './components/Experience';  
import Contact from './components/Contact';
import './App.css';

const App = () => {
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Set blur to false when scrolled halfway down the first section
      setIsBlurred(scrollPosition < windowHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Heading /> {/* Fixed header at the top */}
      
      <main>
        <section id="home" className="section">
          <Home />
        </section>

        <section id="about" className={`section ${isBlurred ? 'blurred' : ''}`}>
          <About />
        </section>

        <section id="portfolio" className="section">
          <Portfolio />
        </section>

        <section id="projects" className="section">
          <Projects />
        </section>

        <section id="experience" className="section">
          <Experience />
        </section>

        <section id="skills" className="section">
          <Skills />
        </section>

        <section id="contact" className="section">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default App;
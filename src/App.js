import React from 'react'; 
import { HashRouter, Routes, Route } from 'react-router-dom';
import Heading from './components/Heading';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';  
import Contact from './components/Contact';
import PortfolioLayout from './components/PortfolioLayout';

import './App.css';

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <Heading />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<PortfolioLayout />}>
              <Route path="projects" element={<Projects />} />
              <Route path="experience" element={<Experience />} />
              <Route path="skills" element={<Skills />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
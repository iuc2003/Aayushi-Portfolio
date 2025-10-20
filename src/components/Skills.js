import React from 'react';
import { FaCode, FaDatabase, FaTools, FaProjectDiagram } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
    return (
      <section id="skills" className="skills">
        <h2>Skills</h2>
        <p>   </p>
        <div className="skills-grid">
          <div className="skill">
            <FaCode className="skill-icon" />
            <h3>Programming Languages</h3>
            <p>Python, C/C++, SAS, Java, HTML, JavaScript, MATLAB, and R</p>
          </div>
          <div className="skill">
            <FaDatabase className="skill-icon" />
            <h3>Cloud & Database Technologies</h3>
            <p>SQL, MongoDB, Firestore, Git</p>
          </div>
          <div className="skill">
            <FaProjectDiagram className="skill-icon" />
            <h3>Software Development Skills</h3>
            <p>Object Oriented Design, Software Testing/Debugging, Algorithm Implementation, and Data Structures</p>
          </div>
          <div className="skill">
            <FaTools className="skill-icon" />
            <h3>Software Developer Tools</h3>
            <p>Android Studio, Visual Studio, GitHub, OpenShift, BitBucket, Jira, Docker, Apache Airflow, Redis, Azure & AWS</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default Skills;
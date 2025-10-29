import React from 'react';
import { FaCode, FaDatabase, FaTools, FaProjectDiagram } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const skills = [
    {
      icon: <FaCode className="skill-icon" />,
      title: 'Programming Languages',
      description: 'Python, C/C++, SAS, Java, HTML, JavaScript, MATLAB, and R',
    },
    {
      icon: <FaDatabase className="skill-icon" />,
      title: 'Cloud & Database Technologies',
      description: 'SQL, MongoDB, Firestore, Git',
    },
    {
      icon: <FaProjectDiagram className="skill-icon" />,
      title: 'Software Development Skills',
      description: 'Object Oriented Design, Software Testing/Debugging, Algorithm Implementation, and Data Structures',
    },
    {
      icon: <FaTools className="skill-icon" />,
      title: 'Software Developer Tools',
      description: 'Android Studio, Visual Studio, GitHub, OpenShift, BitBucket, Jira, Docker, Apache Airflow, Redis, Azure & AWS',
    },
  ];
  
  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <p></p>

      <div className="skills-grid">
        {skills.map((skill, idx) => (
          <div className="skill" key={idx} style={{ '--i': idx + 1 }}>
            {skill.icon}
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
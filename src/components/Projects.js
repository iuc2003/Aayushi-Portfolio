import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projectData = [
  {
    title: 'Event Lottery Android Application',
    date: 'September 2024',
    technologies: 'Java, Android Studio, Cloud Firestore, GitHub, Git, Figma, Draw.io',
    overview: 'Developed a mobile Android application that enables users to enroll in available events around the city using a QR code, allow for organizers to randomly pool individuals to be selected based on event capacity, notify entrants about their event selection status, and also allow users to sign up as an organizer to create/update/delete events.',
    contributions: 'Lottery-Based Pooling Algorithm, QR Code Integration, Role-Based Access Control (RBAC), Firebase Realtime Database/Firestore Integration',
    githubLink: 'https://github.com/CMPUT301F24intels/intels-events',
  },
  {
    title: 'Stroke Detector iOS Application',
    date: 'November 2023',
    technologies: 'Python, Swift, PyTorch, TensorFlow, Core ML for CNN',
    overview: 'Developed a mobile iOS application designed to rapidly detect strokes in real-time by analyzing visual signs on a user’s face using a CNN trained on a dataset of 3770 images.',
    contributions: 'Machine Learning Implementation, Performance Optimization',
  },
  {
    title: 'Portfolio Website',
    date: 'November 2024',
    technologies: 'React.js, CSS, JavaScript',
    overview: 'A personal portfolio website to showcase projects and experiences, built using React.js and deployed on GitHub Pages.',
    contributions: 'Web Development, UI/UX',
    githubLink: 'https://github.com/iuc2003/Aayushi-Portfolio',
  },
  {
    title: 'SCALE by ActionKin',
    date: 'March 2025',
    technologies: 'React, Tailwind CSS, Next.js, SQL, Cybera, APIs (Google People, EventBrite, Clerk), GitHub',
    overview: 'Developed an interactive website and community portal that enables like-minded organizations to collaborate and achieve Sustainable Development Goals (SDGs).',
    contributions: 'Impact Reporting (interactive charts, data reports), Cybera Deployment, CI/CD GitHub Actions Pipeline, UI/UX Design',
    githubLink: 'https://github.com/Timi1333/w25project-ActionKin',
  },
  {
    title: 'Job Tracker Application',
    date: 'April 2025',
    technologies: 'Django, Python, SQLite/PostgreSQL, HTML, CSS, GitHub',
    overview: 'Developed a web-based job application organizer to help job seekers track applications, resumes, and employer responses.',
    contributions: 'Backend Development with Django ORM, Data Management, Authentication, Deployment, and Frontend Integration',
    githubLink: 'https://github.com/CMPUT-401/job-tracker',
  },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
  
    return (
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="project-circle"
              onClick={() => setSelectedProject(project)}
            >
              <span>{project.title}</span>
            </div>
          ))}
        </div>
  
        {selectedProject && (
          <div className="project-modal">
            <div className="modal-content">
              <button className="close-button" onClick={() => setSelectedProject(null)}>✕</button>
              <h3>{selectedProject.title}</h3>
              <p><strong>Date:</strong> {selectedProject.date}</p>
              <p><strong>Technologies Used:</strong> {selectedProject.technologies}</p>
              <p><strong>Project Overview:</strong> {selectedProject.overview}</p>
              <p><strong>Technical Contributions:</strong> {selectedProject.contributions}</p>
              <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                <FaGithub />
              </a>
            </div>
          </div>
        )}
      </section>
    );
  };
  
  export default Projects;
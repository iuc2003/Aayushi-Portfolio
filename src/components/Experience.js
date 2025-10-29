import React, { useState, useCallback } from 'react';
import './Experience.css';
import citiLogo from './logos/citi.png';
import wcbLogo from './logos/wcb.png';
import ualbertaLogo from './logos/ualberta.png';
import pumaLogo from './logos/puma.png';

const Experience = () => {
  const experiences = [
    {
      title: 'Software Development Intern',
      company: 'Citi',
      dates: 'May 2025 - August 2025',
      description: ' Designed and scaled a proof-of-concept Developer Portal to support over 200 million customer accounts by enabling third-party API access and integrating Redis, Apache Airflow, OpenShift/Kubernetes, Harness, Lightspeed, Oracle SQL, and full-stack components in Java and React.',
      logo: citiLogo
    },
    {
      title: 'Software Business Analyst Intern',
      company: 'Workers’ Compensation Board Alberta (WCB)',
      dates: 'May 2024 - August 2024',
      description: 'Collaborated with teams to convert SAS jobs and business reports to SQL, reframing workflows for the PAM portal and working with WCB’s Data and Analytics team to ensure proper setup in the Cloud Data Platform. Additionally, contributed to AI training data creation and documented SAS migration processes to enhance customer service and streamline the SAS Migration Project.',
      logo: wcbLogo
    },
    {
      title: 'Undergraduate Summer Student Researcher',
      company: 'University of Alberta',
      dates: 'May 2023 - August 2023',
      description: 'Utilized MATLAB and R to analyze data and create predictive models for a lab studying arsenic transport into red blood cells, while also performing minor web development and bug fixes using HTML and JavaScript.',
      logo: ualbertaLogo
    },
    {
      title: 'Sales Associate',
      company: 'Puma South Common',
      dates: 'July 2021 - October 2022',
      description: 'Assisted customers with product selection and provided information on retail product features.',
      logo: pumaLogo
    },
  ];

  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = useCallback((idx) => {
    setFlippedIndex((prev) => (prev === idx ? -1 : idx));
  }, []);

  const onKey = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(idx);
    }
  };

  return (
    <section id="experience" className="experience">
      <h2>Work Experience</h2>

      <div className="timeline">
        {experiences.map((exp, idx) => {
          const isFlipped = flippedIndex === idx;
          return (
            <div
              key={idx}
              className="timeline-item"
              style={{ '--i': idx + 1 }} 
            >
              <div className="timeline-dot" />

              {/* Make the timeline content the flip-card */}
              <div
                className={`timeline-content flip-card ${isFlipped ? 'flipped' : ''}`}
                tabIndex={0}
                role="button"
                aria-pressed={isFlipped}
                aria-label={
                  isFlipped ? `Hide ${exp.company} logo` : `Show ${exp.company} logo`
                }
                onClick={() => toggleFlip(idx)}
                onKeyDown={(e) => onKey(e, idx)}
              >
                <div className="flip-inner">
                  {/* FRONT */}
                  <div className="flip-face flip-front">
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                    <p className="timeline-dates">{exp.dates}</p>
                    <p>{exp.description}</p>
                  </div>

                  {/* BACK (logo) */}
                  <div className="flip-face flip-back">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="company-logo"
                    />
                    <div className="logo-caption">{exp.company}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
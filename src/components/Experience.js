import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
        title: 'Software Business Analyst Intern',
        company: 'Workers’ Compensation Board Alberta (WCB)',
        dates: 'May 2024 - August 2024',
        description: 'Collaborated with teams to convert SAS jobs and business reports to SQL, reframing workflows for the PAM portal and working with WCB’s Data and Analytics team to ensure proper setup in the Cloud Data Platform. Additionally, contributed to AI training data creation and documented SAS migration processes to enhance customer service and streamline the SAS Migration Project.',
    },
    {
      title: 'Undergraduate Summer Student Researcher',
      company: 'University of Alberta',
      dates: 'May 2023 - August 2023',
      description: 'Utilized MATLAB and R to analyze data and create predictive models for a lab studying arsenic transport into red blood cells, while also performing minor web development and bug fixes using HTML and JavaScript.',
    },
    {
      title: 'Sales Associate',
      company: 'Puma South Common',
      dates: 'July 2021 - October 2022',
      description: 'Assisted customers with product selection and provided information on retail product features.',
    },
  ];

  return (
    <section id="experience" className="experience">
      <h2>Work Experience</h2>
      <div className="timeline">
        {experiences.map((experience, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3>{experience.title}</h3>
              <h4>{experience.company}</h4>
              <p className="timeline-dates">{experience.dates}</p>
              <p>{experience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
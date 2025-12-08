import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

const Services = () => {

  const services = [
    {
      id: 'admissions',
      icon: '🎓',
      title: 'Admissions (Domestic & International)',
      subtitle: '"Your journey to the right college starts with the right guidance."',
      heading: 'What we provide',
      features: [
        'College & course shortlisting',
        'Domestic & international admission support',
        'Application, SOP & LOR assistance',
        'Entrance & interview guidance',
        'Verified college info & direct links',
      ],
      details: 'Our admissions experts guide you through every step of the application process. From college selection to final enrollment, we ensure you make informed decisions aligned with your career goals and aspirations.',
    },
    {
      id: 'counselling',
      icon: '🧠',
      title: 'Counselling & Career Guidance',
      subtitle: '"Clarity today creates confidence tomorrow."',
      heading: 'What we provide',
      features: [
        '1-on-1 expert counselling',
        'Course & career planning',
        'UG / PG / Abroad guidance',
        'Scholarship & fee insights',
        'Google Meet sessions',
        'Parent counselling support',
      ],
      details: 'Personalized career counselling tailored to your aspirations and circumstances. Our experts help you navigate education options, plan your academic journey, and unlock scholarship opportunities for your success.',
    },
    {
      id: 'freelance',
      icon: '✨',
      title: 'Freelance & Student Support Services',
      subtitle: '"Helping you grow beyond the classroom."',
      heading: 'What we provide',
      features: [
        'Freelance project assistance',
        'Resume & portfolio improvement',
        'Academic presentation help',
        'Skill & internship guidance',
        'Professional writing support',
      ],
      details: 'Beyond classroom learning, we help you build real-world skills, create compelling portfolios, and land internships or freelance opportunities to accelerate your professional career growth.',
    },
  ];

  return (
    <div className="page-container services-page">
      <section className="content-section">
        <h1>Our Services</h1>
        <p className="section-intro">
          Comprehensive support for your educational and career journey
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>
                  <span className="service-icon">{service.icon}</span>
                  {service.title}
                </h3>
                {service.subtitle && <p className="service-subtitle">{service.subtitle}</p>}
              </div>

              <div className="service-body">
                <p className="service-heading">{service.heading}</p>
                <ul className="service-features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                <Link to={`/services/${service.id}`} className="service-more-btn">
                  MORE
                </Link>
              </div>
            </div>
          ))}
        </div>

        
      </section>
    </div>
  );
};

export default Services;



import React, { useMemo, useState } from 'react';
import '../styles/Admissions.css';
import { colleges } from '../data/collegesData';
const Admissions = () => {
  const [sectionFilter, setSectionFilter] = useState('All');

  // Colleges and universities list (complete data from user)
 
  // Section-based filters requested by user
  const sections = useMemo(() => [
    'All',
    'Colleges in Bangalore',
    'Universities in Bangalore',
    'Universities in Telangana',
    'Universities in Chennai',
    'North Universities',
  ], []);

  const filteredColleges = useMemo(() => {
    switch (sectionFilter) {
      case 'Colleges in Bangalore':
        return colleges.filter(c => c.region === 'Bangalore' && c.category === 'Engineering');
      case 'Universities in Bangalore':
        return colleges.filter(c => c.region === 'Bangalore' && c.category === 'University');
      case 'Universities in Telangana':
        return colleges.filter(c => (c.region === 'Hyderabad' || c.region === 'Telangana') && c.category === 'University');
      case 'Universities in Chennai':
        return colleges.filter(c => c.region === 'Chennai' && c.category === 'University');
      case 'North Universities':
        return colleges.filter(c => ['Jaipur', 'Rajkot', 'Gwalior'].includes(c.region) && c.category === 'University');
      default:
        return colleges;
    }
  }, [sectionFilter, colleges]);

  return (
    <div className="page-container admissions-page">
      {/* Hero Section */}
      <section className="admissions-hero">
        <h1 className="admissions-title">Admissions Guidance</h1>
        <p className="admissions-subtitle">
          Explore top colleges and universities across India. Find the perfect institution for your academic journey.
        </p>
      </section>

      {/* Content Section */}
      <section className="content-section admissions-content">
        {/* Filter Controls (section based) */}
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label"></label>
            <div className="section-buttons">
              {sections.map(s => (
                <button
                  key={s}
                  className={`filter-btn ${sectionFilter === s ? 'active' : ''}`}
                  onClick={() => setSectionFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}</p>
        </div>

        {/* College Grid */}
        <div className="colleges-grid">
          {filteredColleges.map(college => (
            <div key={college.id} className="college-card">
              <div className="college-image-wrapper">
                {/* Use gallery/image if provided, otherwise show a simple placeholder */}
                <img
                  src={college.image || `https://source.unsplash.com/800x600/?college,${encodeURIComponent(college.city || college.region)}&sig=${college.id}`}
                  alt={college.name}
                  className="college-image"
                />
                <div className="college-category-badge">{college.category}</div>
              </div>

              <div className="college-content">
                <h3 className="college-name">{college.name}</h3>
                <p className="college-location"><span className="location-icon">📍</span>{college.city || college.region}</p>
                <p className="college-description">{college.description || ''}</p>

                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-info-btn"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="no-results">
            <p>No colleges found for the selected filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admissions;



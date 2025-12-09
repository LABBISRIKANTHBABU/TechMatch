import React, { useState } from 'react';
import '../styles/Admissions.css';

const Admissions = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const colleges = [
    // Top Colleges in Bangalore
    {
      id: 1,
      name: 'IIT Bangalore',
      region: 'Bangalore',
      category: 'Top Colleges in Bangalore',
      city: 'Bangalore',
      description: 'Premier engineering and technology institute with world-class research facilities and excellent placement records.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      website: 'https://www.iisc.ac.in/'
    },
    {
      id: 2,
      name: 'BITS Pilani - Bangalore Campus',
      region: 'Bangalore',
      category: 'Top Colleges in Bangalore',
      city: 'Bangalore',
      description: 'Renowned private technical university with multiple campuses and strong industry connections.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
      website: 'https://www.bits-pilani.ac.in/'
    },
    {
      id: 3,
      name: 'VIT Bangalore',
      region: 'Bangalore',
      category: 'Top Colleges in Bangalore',
      city: 'Bangalore',
      description: 'Vellore Institute of Technology with modern infrastructure and excellent academic programs.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
      website: 'https://www.vitbhopal.ac.in/'
    },
    {
      id: 4,
      name: 'RV College of Engineering',
      region: 'Bangalore',
      category: 'Top Colleges in Bangalore',
      city: 'Bangalore',
      description: 'Prestigious engineering college known for innovation and industry partnerships.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      website: 'https://rvce.edu.in/'
    },

    // Top Universities in Bangalore
    {
      id: 5,
      name: 'Bangalore University',
      region: 'Bangalore',
      category: 'Top Universities in Bangalore',
      city: 'Bangalore',
      description: 'State university offering diverse undergraduate and postgraduate programs.',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      website: 'https://bangaloreuniversity.ac.in/'
    },
    {
      id: 6,
      name: 'CHRIST University',
      region: 'Bangalore',
      category: 'Top Universities in Bangalore',
      city: 'Bangalore',
      description: 'Private university with strong academics and global exposure programs.',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      website: 'https://christuniversity.in/'
    },
    {
      id: 7,
      name: 'Jain University',
      region: 'Bangalore',
      category: 'Top Universities in Bangalore',
      city: 'Bangalore',
      description: 'Private university with comprehensive educational offerings and infrastructure.',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      website: 'https://www.jainuniversity.ac.in/'
    },

    // North Universities
    {
      id: 8,
      name: 'IIT Delhi',
      region: 'North',
      category: 'North Universities',
      city: 'New Delhi',
      description: 'Leading institute of technology with strong industry connections and research excellence.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      website: 'https://www.iitd.ac.in/'
    },
    {
      id: 9,
      name: 'Delhi University',
      region: 'North',
      category: 'North Universities',
      city: 'New Delhi',
      description: 'Prestigious university with diverse colleges and comprehensive academic programs.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      website: 'https://www.du.ac.in/'
    },
    {
      id: 10,
      name: 'Punjab University',
      region: 'North',
      category: 'North Universities',
      city: 'Chandigarh',
      description: 'Premier university in North India with strong academics and research programs.',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      website: 'https://puchd.ac.in/'
    },
    {
      id: 11,
      name: 'Ashoka University',
      region: 'North',
      category: 'North Universities',
      city: 'Sonipat, Haryana',
      description: 'Private liberal arts university with innovative curricula and global approach.',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      website: 'https://www.ashoka.edu.in/'
    },

    // Top Universities in Telangana
    {
      id: 12,
      name: 'IIIT Hyderabad',
      region: 'Telangana',
      category: 'Top Universities in Telangana',
      city: 'Hyderabad',
      description: 'Research-focused institute specializing in IT and related fields with excellent placements.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
      website: 'https://www.iiit.ac.in/'
    },
    {
      id: 13,
      name: 'University of Hyderabad',
      region: 'Telangana',
      category: 'Top Universities in Telangana',
      city: 'Hyderabad',
      description: 'Deemed university with strong research focus and comprehensive academic programs.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      website: 'https://www.uohyd.ac.in/'
    },
    {
      id: 14,
      name: 'Hyderabad Central University',
      region: 'Telangana',
      category: 'Top Universities in Telangana',
      city: 'Hyderabad',
      description: 'Autonomous university known for quality education and research excellence.',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      website: 'https://www.uohyd.ac.in/'
    },
    {
      id: 15,
      name: 'JNTUH',
      region: 'Telangana',
      category: 'Top Universities in Telangana',
      city: 'Hyderabad',
      description: 'Jawaharlal Nehru Technological University with diverse engineering programs.',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      website: 'https://www.jntuh.ac.in/'
    },

    // Top Universities in Chennai
    {
      id: 16,
      name: 'IIT Madras',
      region: 'Chennai',
      category: 'Top Universities in Chennai',
      city: 'Chennai',
      description: 'Top-ranked technical university known for excellence in engineering and sciences.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      website: 'https://www.iitm.ac.in/'
    },
    {
      id: 17,
      name: 'Anna University',
      region: 'Chennai',
      category: 'Top Universities in Chennai',
      city: 'Chennai',
      description: 'Premier technological university with excellent engineering and technology programs.',
      image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
      website: 'https://www.annauniv.edu/'
    },
    {
      id: 18,
      name: 'Madras University',
      region: 'Chennai',
      category: 'Top Universities in Chennai',
      city: 'Chennai',
      description: 'Prestigious university with diverse academic programs and strong faculty.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
      website: 'https://www.unom.ac.in/'
    },
    {
      id: 19,
      name: 'SRM University',
      region: 'Chennai',
      category: 'Top Universities in Chennai',
      city: 'Chennai',
      description: 'Private university with modern infrastructure and industry-focused curriculum.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800',
      website: 'https://www.srmist.edu.in/'
    },
    {
      id: 20,
      name: 'VIT Chennai',
      region: 'Chennai',
      category: 'Top Universities in Chennai',
      city: 'Chennai',
      description: 'Multi-campus technology university with strong placement records.',
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
      website: 'https://www.vit.ac.in/'
    }
  ];

  // Get unique categories from colleges
  const categories = ['All', ...new Set(colleges.map(college => college.category))];

  // Filter colleges based on active filter
  const filteredColleges = activeFilter === 'All' 
    ? colleges 
    : colleges.filter(college => college.category === activeFilter);

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
        {/* Filter Buttons */}
        <div className="filter-container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
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
                <img 
                  src={college.image} 
                  alt={college.name}
                  className="college-image"
                />
                <div className="college-category-badge">{college.region}</div>
              </div>

              <div className="college-content">
                <h3 className="college-name">{college.name}</h3>
                <p className="college-location">
                  <span className="location-icon">📍</span>
                  {college.city}
                </p>
                <p className="college-description">{college.description}</p>

                <a 
                  href={college.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="more-info-btn"
                >
                  More Info
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="no-results">
            <p>No colleges found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admissions;

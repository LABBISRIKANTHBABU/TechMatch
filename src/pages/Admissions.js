

import React, { useMemo, useState } from 'react';
import '../styles/Admissions.css';

const Admissions = () => {
  const [sectionFilter, setSectionFilter] = useState('All');

  // Colleges and universities list (complete data from user)
  const colleges = [
    // Bangalore - Engineering Colleges
    { id: 1, name: 'RV College of Engineering', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.rvce.edu.in', image: 'https://www.admissioninbangalore.in/wp-content/uploads/2019/02/rvce-1.jpg', description: '' },
    { id: 2, name: 'BMS College of Engineering', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.bmsce.ac.in', image: 'https://shikshaforum.in/wp-content/uploads/2024/08/bms-college-of-engineering.jpg', description: '' },
    { id: 3, name: 'M.S. Ramaiah Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.msrit.edu', image: 'https://careermantra.org/front_assets/images/M__S__Ramaiah_Institute_of_Technology.jpg', description: '' },
    { id: 4, name: 'Dayananda Sagar College of Engineering', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.dsce.edu.in', image: '', description: '' },
    { id: 5, name: 'New Horizon College of Engineering', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://newhorizoncollegeofengineering.in', image: '', description: '' },
    { id: 6, name: 'Meenakshi Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://mit.ac.in', image: 'https://www.collegedhundo.com/images/blog/mainBuilding.jpg', description: '' },
    { id: 7, name: 'Acharya Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.acharya.ac.in', image: 'https://campushunt.in/photogallery/acharya.jpg', description: '' },
    { id: 8, name: 'Cambridge Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.cambridge.edu.in', image: '', description: '' },
    { id: 9, name: 'Brindavan College of Engineering', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.brindavancollege.com', image: 'https://images.shiksha.com/mediadata/images/1508731480phpe0vOA4.jpeg', description: '' },
    { id: 10, name: 'Akash Group of Institutions', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.akashgroup.ac.in', image: 'https://i.ytimg.com/vi/isYElmimu84/maxresdefault.jpg', description: '' },
    { id: 11, name: 'Nagarjuna College of Engineering & Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://ncet.co.in', image: 'https://images.shiksha.com/mediadata/images/1582006011phpILeBqh.jpeg', description: '' },
    { id: 12, name: 'East Point College of Engineering & Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.eastpoint.ac.in', image: 'https://www.admissionpro.in/images/east-point-college-of-engineering-technology-bangalore-admission.jpg', description: '' },
    { id: 13, name: 'R.R. Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.rrit.ac.in', image: 'https://image-static.collegedunia.com/public/college_data/images/appImage/14668_RR0.jpg', description: '' },
    { id: 14, name: 'T. John Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.tjohncollege.com', image: 'https://webapi.tjohncollege.com/GalleryImages/0223803265.jpg', description: '' },
    { id: 15, name: 'S.E.A. College of Engineering & Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://seacet.com', image: 'https://seacet.edu.in/images/clgbldg.jpg', description: '' },
    { id: 16, name: 'Jalappa Institute of Technology', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://jalappainstituteoftechnology.org', image: 'https://rljit.in/about-images/about-rljit-2.jpg', description: '' },
    { id: 17, name: 'Aditya Institute of Technology (Bengaluru)', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.aditya-group.org', image: '', description: '' },
    { id: 18, name: 'Impact College of Engineering & Applied Sciences', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.impact.ac.in', image: 'https://careermudhra.com/wp-content/uploads/impact-college-of-engineering-and-applied-sciences-bangalore.jpg', description: '' },
    { id: 19, name: 'SV College of Engineering (Bengaluru)', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://svce.ac.in', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEw8xlTJZYqPrzTk3RhVzPjzDSvJZCofqWw&s', description: '' },
    { id: 20, name: 'Amrita Vishwa Vidyapeetham', region: 'Bangalore', city: 'Bengaluru', category: 'Engineering', website: 'https://www.amrita.edu', image: 'https://images.shiksha.com/mediadata/images/1537870670phpqpbOGr.jpeg', description: 'Numerous other reputable engineering colleges in Bangalore offering diverse programs and specializations.' },

    // Bangalore - Universities
    { id: 21, name: 'Alliance University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.alliance.edu.in', image: 'https://www.alliance.edu.in/uploads/infra_gallery/campaus-banner_3.webp', description: '' },
    { id: 22, name: 'Amity University, Bengaluru', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.amity.edu/bangalore', image: 'https://images.shiksha.com/mediadata/images/1740466496phpODZnmF.jpeg', description: '' },
    { id: 23, name: 'Chanakya University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://chanakyauniversity.in', image: 'https://chanakyauniversity.edu.in/wp-content/uploads/2023/03/banner.jpg', description: '' },
    { id: 24, name: 'Christ University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://christuniversity.in', image: 'https://christuniversity.in/images/chris-building.jpg', description: '' },
    { id: 25, name: 'CMR University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.cmr.edu.in', image: 'https://www.cmr.edu.in/wp-content/uploads/2025/05/campus_gallery_img-11-1.webp', description: '' },
    { id: 26, name: 'Dayananda Sagar University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.dsu.edu.in', image: 'https://www.pathwayeducationtrust.in/images/132/1741587706.jpg', description: '' },
    { id: 27, name: 'Garden City University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.gardencity.university', image: 'https://www.gardencity.university/wp-content/uploads/2023/12/5.webp', description: '' },
    { id: 28, name: 'Manipal Academy of Higher Education (Bengaluru)', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://manipal.edu', image: 'https://carams.in/wp-content/uploads/2018/10/univ.jpg', description: '' },
    { id: 29, name: 'JAIN (Deemed-to-be University)', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.jainuniversity.ac.in', image: 'https://www.searchurcollege.com/blog/wp-content/uploads/2022/12/Jain-University-Bengaluru.png', description: '' },
    { id: 30, name: 'MS Ramaiah University of Applied Sciences', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.msruas.ac.in', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmHbjSQMc3zWFe6aD1HH1xxozjR8czM_6yKw&s', description: '' },
    { id: 31, name: 'PES University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.pes.edu', image: 'https://storage.googleapis.com/news-project-475308.appspot.com/news/Uploads/Photo.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=news-project-475308%40appspot.gserviceaccount.com%2F20251208%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20251208T150935Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=7194e694110b5ad5b3d245de0c894574aa4db694babf00b7b38cbbb81fda0bab3c44737a4f9675d380912ee009361a270cff28b9bbb0012200627835f29c52ad96e6166cc33151b78dd2d3937ecaeb9ee5c8cb357903f938cab91ab4b89342e29658a2a162c56422d7ba59123e79ca2b7dc285ec9fca6c79c7ddd9e4734e2f5ff2c5c979cde7a6a969f9ba194478f276fbbcc325b4c6336953ed7f4abb0eb4380117f30f9261f5b11d6e57bc76bec50aed5404743e5a491b5c2f022e445b8ebcea9d64e864edf385bf73c119a95a5a1faf282ec3a7b280ac247e696c10686e4dfccaf2b4890c46a30935a943c77d8542f45872ef998e823d8f6e2920cf91c082', description: '' },
    { id: 32, name: 'Presidency University, Bengaluru', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://presidencyuniversity.in', image: 'https://presidencyuniversity.in/assets/images/university-right-img-3.webp', description: '' },
    { id: 33, name: 'REVA University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.reva.edu.in', image: 'https://www.collegedhundo.com/images/blog/e16bd1e039aad1a515a31db6962724ee.jpg', description: '' },
    { id: 34, name: 'Sapthagiri Institute of Medical Sciences and Research Centre', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://sapthagiri.edu.in', image: 'https://www.collegedhundo.com/images/college/image_750x415_5c605199c8073.jpg', description: '' },
    { id: 35, name: 'S-VYASA University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.svyasa.edu.in', image: 'https://images.shiksha.com/mediadata/images/1746090012phpkdOAIy.jpeg', description: '' },
    { id: 36, name: 'Rai Technology University', region: 'Bangalore', city: 'Bengaluru', category: 'University', website: 'https://www.raitechuniversity.in', image: 'https://admissionbangalore.co.in/wp-content/uploads/2023/03/Rai-university-Bangalore-Photo-.jpeg', description: '' },

    // Telangana / Hyderabad - Universities
    { id: 37, name: 'Woxsen University', region: 'Hyderabad', city: 'Hyderabad', category: 'University', website: 'https://woxsen.edu.in', image: '', description: '' },
    { id: 38, name: 'Guru Nanak Institutions', region: 'Hyderabad', city: 'Hyderabad', category: 'Engineering', website: 'https://www.gniindia.org', image: '', description: '' },
    { id: 39, name: 'Malla Reddy University', region: 'Hyderabad', city: 'Hyderabad', category: 'University', website: 'https://www.mru.edu.in', image: '', description: '' },
    { id: 40, name: 'VNR Vignana Jyothi Institute of Engineering & Technology', region: 'Hyderabad', city: 'Hyderabad', category: 'Engineering', website: 'https://www.vnrvjiet.ac.in', image: '', description: '' },
    { id: 41, name: 'BVRIT', region: 'Hyderabad', city: 'Hyderabad', category: 'Engineering', website: 'https://bvrit.ac.in', image: '', description: '' },

    // Chennai / Tamil Nadu - Universities
    { id: 42, name: 'Amrita Vishwa Vidyapeetham (Chennai)', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.amrita.edu/campus/chennai/', image: '', description: '' },
    { id: 43, name: 'Vellore Institute of Technology (Chennai)', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://chennai.vit.ac.in', image: '', description: '' },
    { id: 44, name: 'SRM Institute of Science and Technology', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.srmist.edu.in', image: '', description: '' },
    { id: 45, name: 'SASTRA Deemed University', region: 'Chennai', city: 'Thanjavur', category: 'University', website: 'https://www.sastra.edu', image: '', description: '' },
    { id: 46, name: 'Vel Tech University', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.veltech.edu.in', image: '', description: '' },
    { id: 47, name: 'Savitha Institute of Medical & Technical Sciences', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.savitha.ac.in', image: '', description: '' },
    { id: 48, name: 'Takshashila University', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.takshashilauniv.ac.in', image: '', description: '' },
    { id: 49, name: 'Sathyabama Institute of Science and Technology', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.sathyabama.ac.in', image: '', description: '' },
    { id: 50, name: 'St. Joseph\'s Institute of Technology', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://stjosephstechnology.ac.in', image: '', description: '' },
    { id: 51, name: 'Dhanalakshmi Srinivasan University', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://www.dsuniversity.ac.in', image: '', description: '' },
    { id: 52, name: 'Dr. M.G.R. Educational & Research Institute', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://drmgrdu.ac.in', image: '', description: '' },
    { id: 53, name: 'Hindustan Institute of Technology and Science', region: 'Chennai', city: 'Chennai', category: 'University', website: 'https://hindustanuniv.ac.in', image: '', description: '' },
    { id: 54, name: 'Kalasalingam Academy of Research and Education', region: 'Chennai', city: 'Virudunagar', category: 'University', website: 'https://kalasalingam.ac.in', image: '', description: '' },
    { id: 55, name: 'SCSVMV (Kanchi) University', region: 'Chennai', city: 'Kanchipuram', category: 'University', website: 'https://www.kanchiuniv.ac.in', image: '', description: '' },

    // North - Universities
    { id: 56, name: 'NIIMS University', region: 'Jaipur', city: 'Jaipur', category: 'University', website: 'https://www.nimsuniversity.org', image: '', description: '' },
    { id: 57, name: 'Marwadi University', region: 'Rajkot', city: 'Rajkot', category: 'University', website: 'https://www.marwadiuniversity.ac.in', image: '', description: '' },
    { id: 58, name: 'ITM University', region: 'Gwalior', city: 'Gwalior', category: 'University', website: 'https://itmuniversity.ac.in', image: '', description: '' },
  ];

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



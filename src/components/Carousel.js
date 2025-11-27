import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import '../styles/Carousel.css';

const INITIAL_ITEMS = [
  {
    id: 1,
    title: '"Innovative Solutions"',
    description:
      'Transform your business with cutting-edge technology and expert guidance. We deliver results that matter.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: '"Digital Excellence"',
    description:
      'Partner with us for comprehensive IT consultancy and strategic planning. Your success is our mission.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: '"Future Ready"',
    description:
      'Stay ahead with emerging technologies and best practices. We ensure your organization thrives tomorrow.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: '"Strategic Growth"',
    description:
      'Accelerate your digital transformation journey with proven methodologies and experienced professionals.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: '"Cloud Mastery"',
    description:
      'Optimize your infrastructure and leverage cloud technologies for maximum efficiency and scalability.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: '"Enterprise Solutions"',
    description:
      'Enterprise-grade solutions designed to meet your complex requirements and drive measurable business results.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
];

export default function Carousel() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const next = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });
  };

  const prev = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const last = newItems.pop();
      newItems.unshift(last);
      return newItems;
    });
  };

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-main">
      <ul>
        {items.map((item, idx) => (
          <li
            className="item"
            key={item.id}
            style={{ backgroundImage: `url('${item.image}')` }}
          >
            {/* Fallback colored background while image loads */}
            <div className="item-fallback"></div>
            
            <div className="content">
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
              <button>Read More</button>
            </div>
          </li>
        ))}
      </ul>
      <nav className="nav">
        <div className="btn prev" onClick={prev} aria-label="Previous">
          <IoArrowBackOutline />
        </div>
        <div className="btn next" onClick={next} aria-label="Next">
          <IoArrowForwardOutline />
        </div>
      </nav>
    </div>
  );
}

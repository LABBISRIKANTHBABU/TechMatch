import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import '../styles/Carousel.css';

const INITIAL_ITEMS = [
  {
    id: 1,
    image: '/assets/car1.png',
  },
  {
    id: 2,
    image: '/assets/car2.png',
  },
  {
    id: 3,
    image: '/assets/car7.jpg',
  },
  {
    id: 4,
    image: '/assets/car4.png',
  },
  {
    id: 5,
    image: '/assets/car5.png',
  },
  {
    id: 6,
    image: '/assets/car6.png',
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
            {/* Image only - no overlay cards */}
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
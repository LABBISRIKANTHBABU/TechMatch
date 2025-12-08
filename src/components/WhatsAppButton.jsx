import React, { useState } from 'react';
import { openWhatsApp } from '../config/contactConfig';
import '../styles/WhatsAppButton.css';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    openWhatsApp();
  };

  return (
    <div
      className="whatsapp-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleWhatsAppClick}
      role="button"
      tabIndex={0}
      aria-label="Contact us on WhatsApp"
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWhatsAppClick();
        }
      }}
    >
      <div className={`whatsapp-icon-wrapper ${isHovered ? 'hovered' : ''}`}>
        <img 
          src="/assets/whatsapp.png" 
          alt="WhatsApp" 
          className="whatsapp-icon" 
        />
      </div>
      {isHovered && (
        <div className="whatsapp-tooltip">
          Message us on WhatsApp
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;

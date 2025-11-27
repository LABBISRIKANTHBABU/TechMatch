import React from 'react';
import '../styles/ClientSlider.css';

const ClientSlider = () => {
  // Client logos - using sample images; replace with actual client logos
  const clientLogos = [
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png',
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png',
  ];

  return (
    
      
      <div className="slider">
        <div className="slide-track">
          {/* First set of logos */}
          {clientLogos.map((logo, idx) => (
            <div key={`logo-1-${idx}`} className="slide">
              <img src={logo} height="100" width="250" alt="Client logo" />
            </div>
          ))}
          {/* Duplicate set for seamless infinite scroll */}
          {clientLogos.map((logo, idx) => (
            <div key={`logo-2-${idx}`} className="slide">
              <img src={logo} height="100" width="250" alt="Client logo" />
            </div>
          ))}
        </div>
      </div>
   
  );
};

export default ClientSlider;

import React, { useState, useEffect, useRef } from 'react';
import ExperienceCard from './ExperienceCard';

const Education = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const educationRef = useRef(null);

  useEffect(() => {
    // Start animation based on time, regardless of scroll position
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const education = [
    {
      id: 1,
      company: "University of Waterloo",
      role: "Computer Science",
      location: "Waterloo, ON",
      description: "Bachelor of Computer Science; Minor in Artificial Intelligence",
      logo: "/Uwaterloo.png"
    }
  ];

  return (
    <div 
      ref={educationRef}
      id="education" 
      className="education-container" 
      style={{
        position: 'absolute',
        top: '440px', // Decreased from 480px to move Education up a bit
        left: '50%',
        transform: 'translateX(-50%)', // Center horizontally
        zIndex: 10,
        width: '90%', // Use percentage for better responsiveness
        maxWidth: '1200px', // Maximum width constraint
        minWidth: '320px', // Minimum width for mobile
        opacity: hasAnimated ? 1 : 0,
        transform: `translateX(-50%) ${hasAnimated ? 'translateY(0)' : 'translateY(20px)'}`,
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }}
    >
      {/* Section Title */}
      <h2 style={{
        fontSize: '1.5rem',
        color: 'rgba(255, 255, 255, 0.75)',
        fontFamily: 'NeueMontreal-MediumItalic, sans-serif',
        fontStyle: 'italic',
        margin: '0 0 1rem 0',
        fontWeight: '500'
      }}>
        Education
      </h2>

      {/* Education Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%'
      }}>
        {education.map((edu) => (
          <ExperienceCard 
            key={edu.id} 
            experience={edu} 
            clickable={true}
            link="https://uwaterloo.ca/"
          />
        ))}
      </div>
      
      {/* Responsive CSS */}
      <style>{`
        @font-face {
          font-family: 'NeueMontreal-MediumItalic';
          src: url('/NeueMontreal-MediumItalic.otf') format('opentype');
          font-weight: 500;
          font-style: italic;
        }
        
        @media (max-width: 1200px) {
          .education-container {
            width: 95% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            min-width: 300px !important;
            padding: 0 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .education-container {
            width: calc(95% - 40px) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            min-width: 300px !important;
            padding: 0 20px !important;
          }
        }
        
        /* Responsive spacing to prevent overlap with Experience on narrow screens */
        @media (max-width: 768px) {
          .education-container {
            top: 400px !important; /* Move down more on tablets to create space */
          }
        }
        
        @media (max-width: 480px) {
          .education-container {
            top: 360px !important; /* Move down even more on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default Education;

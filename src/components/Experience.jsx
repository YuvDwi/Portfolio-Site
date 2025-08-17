import React, { useState, useEffect, useRef } from 'react';
import ExperienceCard from './ExperienceCard';

const Experience = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const experienceRef = useRef(null);

  useEffect(() => {
    // Start animation based on time, regardless of scroll position
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  const experiences = [
    {
      id: 1,
      company: "WATCloud",
      role: " Software Engineer",
      location: "Waterloo, ON",
      description: "Working on WATonomous' cloud infrastructure team to build Waterloo's first autonomous vehicle.",
      logo: "/Wato.png"
    },
    {
      id: 2,
      company: "Reality Labs",
      role: "ML Developer",
      location: "Waterloo, ON",
      description: "Developed telemetry system to monitor and collect performance metrics from sensor data",
      logo: "/Reality.png"
    }
  ];

  return (
    <div 
      ref={experienceRef}
      id="experience" 
      className="experience-container" 
      style={{
        position: 'absolute',
        top: '690px', // Increased very slightly from 680px
        left: '50%',
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
        Experience
      </h2>

      {/* Experience Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        width: '100%'
      }}>
        {experiences.map((experience) => (
          <ExperienceCard 
            key={experience.id} 
            experience={experience}
            clickable={experience.company === "WATCloud" || experience.company === "Reality Labs"}
            link={
              experience.company === "WATCloud" 
                ? "https://cloud.watonomous.ca/docs" 
                : experience.company === "Reality Labs"
                ? "https://uwrealitylabs.com/"
                : null
            }
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
          .experience-container {
            width: 95% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            min-width: 300px !important;
            padding: 0 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .experience-container {
            width: calc(95% - 40px) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            min-width: 300px !important;
            padding: 0 20px !important;
          }
        }
        
        /* Responsive spacing to maintain distance from Education on narrow screens */
        @media (max-width: 768px) {
          .experience-container {
            top: 740px !important; /* Reduce spacing on tablets from 760px */
          }
        }
        
        @media (max-width: 480px) {
          .experience-container {
            top: 700px !important; /* Reduce spacing on mobile from 720px */
          }
        }
      `}</style>
    </div>
  );
};

export default Experience;

import React from 'react';

const ExperienceCard = ({ experience, clickable = false, link = null }) => {
  const handleClick = () => {
    if (clickable && link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="glass-experience-card" 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem', // Increased gap between icon and content
        minHeight: '100px', // Reduced height
        width: '100%', // Full width
        userSelect: 'none', // Prevent text selection
        WebkitUserSelect: 'none', // For Safari/Chrome
        MozUserSelect: 'none', // For Firefox
        msUserSelect: 'none', // For IE/Edge
        flexWrap: 'wrap', // Allow wrapping on small screens
        cursor: clickable ? 'pointer' : 'default'
      }}
      onClick={handleClick}
    >
      
      {/* Company Icon */}
      <div className="company-icon" style={{
        flexShrink: 0,
        width: '50px', // Reduced from 60px
        height: '50px', // Reduced from 60px
        borderRadius: '10px', // Slightly reduced
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50px' // Prevent icon from shrinking too much
      }}>
        {experience.logo ? (
          <img 
            src={experience.logo} 
            alt={`${experience.company} logo`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <span style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1.5rem',
            fontFamily: 'NeueMontreal-Light, sans-serif',
            fontWeight: '300'
          }}>
            {experience.company.charAt(0)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minWidth: '0', // Allow content to shrink and wrap
        maxWidth: '100%', // Ensure content doesn't exceed container width
        overflowWrap: 'break-word', // Force text to wrap
        wordBreak: 'break-word' // Break long words if necessary
      }}>
        {/* Company and Role */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          width: '100%' // Take full width
        }}>
          <h3 style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', // Responsive font size
            color: 'rgba(255, 255, 255, 0.75)',
            fontFamily: 'NeueMontreal-Medium, sans-serif',
            fontStyle: 'normal',
            margin: 0,
            fontWeight: '500',
            wordWrap: 'break-word', // Allow long company names to wrap
            overflowWrap: 'break-word', // Force wrapping
            wordBreak: 'break-word', // Break long words
            userSelect: 'none', // Prevent text selection
            WebkitUserSelect: 'none', // For Safari/Chrome
            MozUserSelect: 'none', // For Firefox
            msUserSelect: 'none' // For IE/Edge
          }}>
            {experience.company}
          </h3>
          <p style={{
            fontSize: 'clamp(0.95rem, 2.3vw, 1.15rem)', // Slightly larger font size
            color: 'rgba(255, 255, 255, 0.9)', // Higher contrast for better readability
            fontFamily: 'NeueMontreal-Light, sans-serif',
            margin: 0,
            fontWeight: '300',
            lineHeight: '1.4', // Better line height for role text
            wordWrap: 'break-word', // Allow long role names to wrap
            overflowWrap: 'break-word', // Force wrapping
            wordBreak: 'break-word', // Break long words
            letterSpacing: '0.005em', // Slight letter spacing
            userSelect: 'none', // Prevent text selection
            WebkitUserSelect: 'none', // For Safari/Chrome
            MozUserSelect: 'none', // For Firefox
            msUserSelect: 'none' // For IE/Edge
          }}>
            {experience.role}
          </p>
        </div>

        {/* Location */}
        <p style={{
          fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', // Slightly larger font size
          color: 'rgba(255, 255, 255, 0.6)',
          fontFamily: 'NeueMontreal-Light, sans-serif',
          margin: 0,
          fontWeight: '300',
          wordWrap: 'break-word', // Allow long locations to wrap
          overflowWrap: 'break-word', // Force wrapping
          wordBreak: 'break-word', // Break long words
          userSelect: 'none', // Prevent text selection
          WebkitUserSelect: 'none', // For Safari/Chrome
          MozUserSelect: 'none' // For Firefox
        }}>
          {experience.location}
        </p>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.95rem, 2.3vw, 1.1rem)', // Slightly larger font size
          color: 'rgba(255, 255, 255, 0.85)', // Higher contrast for better readability
          fontFamily: 'NeueMontreal-Light, sans-serif',
          lineHeight: '1.6', // Increased line height for better spacing
          margin: 0,
          marginTop: '0.75rem', // More space above description
          fontWeight: '300',
          wordWrap: 'break-word', // Allow long descriptions to wrap
          overflowWrap: 'break-word', // Force wrapping
          wordBreak: 'break-word', // Break long words
          hyphens: 'auto', // Enable automatic hyphenation
          letterSpacing: '0.01em', // Slight letter spacing for better readability
          userSelect: 'none', // Prevent text selection
          WebkitUserSelect: 'none', // For Safari/Chrome
          MozUserSelect: 'none' // For Firefox
        }}>
          {experience.description}
        </p>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @font-face {
          font-family: 'NeueMontreal-Light';
          src: url('/NeueMontreal-Light.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'NeueMontreal-Medium';
          src: url('/NeueMontreal-Medium.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
        }
        
        .glass-experience-card {
          position: relative;
          background: rgba(128, 128, 128, 0.12);
          border-radius: 20px;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .glass-experience-card:hover {
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
          transform: translateZ(10px) scale(1.02);
        }
        
        .glass-experience-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        }
        
        .glass-experience-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.1));
        }
        
        .glass-experience-card * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-tap-highlight-color: transparent !important;
          outline: none !important;
          -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
          -webkit-focus-ring-color: rgba(0,0,0,0) !important;
          -moz-outline: none !important;
        }
        
        .glass-experience-card *::selection {
          background: transparent !important;
        }
        
        .glass-experience-card *::-moz-selection {
          background: transparent !important;
        }
        
        .glass-experience-card h3, .glass-experience-card p {
          pointer-events: none !important;
        }
        
        .glass-experience-card h3 *, .glass-experience-card p * {
          pointer-events: none !important;
        }
        
        @media (max-width: 768px) {
          .glass-experience-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
            padding: 1.5rem 1rem !important; /* Reduced horizontal padding */
            min-height: 180px !important; /* Taller on tablets */
            width: 100% !important;
            overflow: hidden !important; /* Prevent horizontal overflow */
            box-sizing: border-box !important; /* Include padding in width calculation */
          }
          
          .company-icon {
            align-self: flex-start !important;
          }
          
          .content {
            text-align: left !important;
            flex: 1 !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }
        }
        
        @media (max-width: 480px) {
          .experience-card {
            padding: 1rem 0.5rem !important; /* Minimal horizontal padding */
            gap: 1rem !important;
            min-height: 200px !important; /* Even taller on mobile */
            width: 100% !important;
            overflow: hidden !important;
            box-sizing: border-box !important; /* Include padding in width calculation */
          }
          
          .content {
            width: 100% !important;
            max-width: 100% !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }
          
          h3 {
            font-size: 1.1rem !important;
            width: 100% !important;
            overflow-wrap: break-word !important;
          }
          
          p {
            font-size: 0.9rem !important;
            width: 100% !important;
            overflow-wrap: break-word !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ExperienceCard;

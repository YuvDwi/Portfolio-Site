import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Particle system
  const createParticles = (x, y, buttonWidth, buttonHeight, text) => {
    const newParticles = [];
    const textLength = text.length;
    
    for (let i = 0; i < 480; i++) { // Increased to 220 particles for extremely dense effect
      // Position particles along the text characters
      const charIndex = Math.floor(Math.random() * textLength);
      const charWidth = buttonWidth / textLength;
      const charX = x + (charIndex * charWidth) + (Math.random() * charWidth * 0.8);
      const charY = y + (buttonHeight * 0.3) + (Math.random() * buttonHeight * 0.4); // Center around text baseline
      
      newParticles.push({
        id: particleId.current++,
        x: charX,
        y: charY,
        vx: (Math.random() - 0.5) * 0.6, // Reduced from 1.5 to 0.6 for much slower movement
        vy: (Math.random() - 0.5) * 0.6, // Reduced from 1.5 to 0.6 for much slower movement
        life: 1,
        decay: 0.003 + Math.random() * 0.005, // Reduced from 0.008-0.02 to 0.003-0.008 for much slower decay
        size: Math.random() * 0.8 + 0.2, // Reduced size range from 0.5-4.5 to 0.2-1.0 for much smaller particles
        opacity: 0.9 + Math.random() * 0.1, // Random opacity between 0.9-1.0
        charIndex: charIndex // Track which character this particle came from
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  const updateParticles = () => {
    setParticles(prev => 
      prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx + (Math.random() - 0.5) * 0.3, // Added noise to movement
          y: particle.y + particle.vy + (Math.random() - 0.5) * 0.3, // Added noise to movement
          vx: particle.vx + (Math.random() - 0.5) * 0.05, // Reduced velocity noise from 0.1 to 0.05 for smoother movement
          vy: particle.vy + (Math.random() - 0.5) * 0.05, // Reduced velocity noise from 0.1 to 0.05 for smoother movement
          life: particle.life - particle.decay,
          opacity: particle.opacity - particle.decay * 1.2 // Slower opacity decay
        }))
        .filter(particle => particle.life > 0)
    );
  };

  useEffect(() => {
    const interval = setInterval(updateParticles, 16); // 60fps
    return () => clearInterval(interval);
  }, []);

  const handleButtonHover = (e) => {
    const rect = e.target.getBoundingClientRect();
    const text = e.target.textContent;
    createParticles(rect.left, rect.top, rect.width, rect.height, text);
  };

  return (
    <>
      {/* Particle Canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50
      }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              opacity: particle.opacity,
              transform: `translate(-50%, -50%)`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      <nav style={{
        position: 'absolute',
        top: '60px',
        left: '60px',
        right: '60px',
        zIndex: 100,
        padding: '0rem 0 0rem 0rem',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          margin: 0,
          padding: 0
        }} className="desktop-nav">
          <a href="#education" id="nav-education" style={{
            color: 'rgba(255, 255, 255, 0.75)',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            fontFamily: 'MenoBanner-Condensed, sans-serif',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            margin: 0
          }} onClick={(e) => {
            e.preventDefault();
            document.getElementById('education').scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
            handleButtonHover(e);
          }} onMouseEnter={(e) => {
            e.target.style.color = '#ccc';
            handleButtonHover(e);
          }} onMouseLeave={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.75)';
          }}>
            Education
          </a>
          <a href="#experience" id="nav-experience" style={{
            color: 'rgba(255, 255, 255, 0.75)',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            fontFamily: 'MenoBanner-Condensed, sans-serif',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            margin: 0
          }} onClick={(e) => {
            e.preventDefault();
            document.getElementById('experience').scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
            handleButtonHover(e);
          }} onMouseEnter={(e) => {
            e.target.style.color = '#ccc';
            handleButtonHover(e);
          }} onMouseLeave={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.75)';
          }}>
            Experience
          </a>
          <a href="#projects" id="nav-projects" style={{
            color: 'rgba(255, 255, 255, 0.75)',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            fontFamily: 'MenoBanner-Condensed, sans-serif',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            margin: 0
          }} onClick={(e) => {
            e.preventDefault();
            document.getElementById('projects').scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
            handleButtonHover(e);
          }} onMouseEnter={(e) => {
            e.target.style.color = '#ccc';
            handleButtonHover(e);
          }} onMouseLeave={(e) => {
            e.target.style.color = 'rgba(255, 255, 255, 0.75)';
          }}>
            Projects
          </a>
          
          {/* Desktop Social Icons */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginLeft: '2rem',
            alignItems: 'center'
          }}>
            <a href="https://github.com/YuvDwi" id="social-github" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              const rect = e.target.getBoundingClientRect();
              createParticles(rect.left, rect.top, rect.width, rect.height, "GitHub");
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/yuvraj-dwivedi-3218b5193/" id="social-linkedin" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              const rect = e.target.getBoundingClientRect();
              createParticles(rect.left, rect.top, rect.width, rect.height, "LinkedIn");
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://x.com" id="social-x" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '1.2rem',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              const rect = e.target.getBoundingClientRect();
              createParticles(rect.left, rect.top, rect.width, rect.height, "X");
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

      {/* Mobile Menu Button */}
      <div style={{
        display: 'none',
        cursor: 'pointer',
        color: 'white',
        fontSize: '1.5rem',
        transition: 'transform 0.3s ease',
        margin: 0,
        padding: 0
      }} className="mobile-menu-btn" onClick={toggleMenu}>
        <div style={{
          transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          ☰
        </div>
      </div>

      {/* Mobile Navigation */}
      <div style={{
        position: 'absolute',
        top: '100%',
        right: '0px',
        width: '150px',
        backgroundColor: 'rgba(128, 128, 128, 0.12)',
        backdropFilter: 'blur(20px)',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        alignItems: 'center',
        borderRadius: '12px',
        marginTop: '0.5rem',
        border: '0.5px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        opacity: isMenuOpen ? 1 : 0,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(20px)',
        transition: 'all 0.3s ease',
        pointerEvents: isMenuOpen ? 'auto' : 'none'
      }}>
        <a href="#education" style={{
          color: 'rgba(255, 255, 255, 0.75)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          fontFamily: 'NeueMontreal-Medium, sans-serif',
          padding: '0.5rem 0.8rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          width: '100%',
          textAlign: 'left'
        }} onClick={(e) => {
          e.preventDefault();
          document.getElementById('education').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
          handleButtonHover(e);
          setIsMenuOpen(false);
        }} onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }} onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}>
          education
        </a>
        <a href="#experience" style={{
          color: 'rgba(255, 255, 255, 0.75)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          fontFamily: 'NeueMontreal-Medium, sans-serif',
          padding: '0.5rem 0.8rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          width: '100%',
          textAlign: 'left'
        }} onClick={(e) => {
          e.preventDefault();
          document.getElementById('experience').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
          handleButtonHover(e);
          setIsMenuOpen(false);
        }} onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }} onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}>
          experience
        </a>
        <a href="#projects" style={{
          color: 'rgba(255, 255, 255, 0.75)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          fontFamily: 'NeueMontreal-Medium, sans-serif',
          padding: '0.5rem 0.8rem',
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          width: '100%',
          textAlign: 'left'
        }} onClick={(e) => {
          e.preventDefault();
          document.getElementById('projects').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
          handleButtonHover(e);
          setIsMenuOpen(false);
        }} onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }} onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
        }}>
          projects
        </a>
        
        {/* Social Icons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '0.5rem',
          paddingTop: '1.2rem',
          paddingBottom: '0.3rem',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          width: '100%',
          justifyContent: 'center'
        }}>
          <a href="https://github.com/YuvDwi" id="social-github" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.color = '#ccc';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.color = 'rgba(255, 255, 255, 0.75)';
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/yuvraj-dwivedi-3218b5193/" id="social-linkedin" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.color = '#ccc';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.color = 'rgba(255, 255, 255, 0.75)';
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease'
          }} onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.color = '#ccc';
          }} onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.color = 'rgba(255, 255, 255, 0.75)';
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 100px;
        }
        
        @font-face {
          font-family: 'MenoBanner-Condensed';
          src: url('/meno-banner-condensed-italic.otf') format('opentype');
          font-weight: normal;
          font-style: italic;
        }
        @font-face {
          font-family: 'NeueMontreal-Regular';
          src: url('/NeueMontreal-Regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'NeueMontreal-Medium';
          src: url('/NeueMontreal-Medium.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          nav {
            padding: 0rem 0 0rem 0 !important;
            
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </nav>
    </>
  );
};

export default Navbar;

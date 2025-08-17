import React, { useState, useEffect, useRef } from 'react';

const Projects = () => {
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('projects-title')) {
              // Animate title immediately when section comes into view
              setTitleAnimated(true);
            } else if (!animatedCards.has(entry.target.dataset.projectId)) {
              // Animate project cards immediately when visible, no staggered delay
              setAnimatedCards(prev => new Set([...prev, entry.target.dataset.projectId]));
            }
          }
        });
      },
      {
        threshold: 0, // Trigger when top of element becomes visible
        rootMargin: '0px 0px 0px 0px' // No margin, trigger exactly at intersection
      }
    );

    // Observe the title and each project card individually
    const title = projectsRef.current?.querySelector('.projects-title');
    const projectCards = projectsRef.current?.querySelectorAll('.project-card');
    
    if (title) observer.observe(title);
    if (projectCards) {
      projectCards.forEach(card => observer.observe(card));
    }

    return () => observer.disconnect();
  }, [animatedCards]);

  const projects = [
    {
      id: 1,
      title: "Colornet",
      description: "Convultional Neural Network for black and white image colorization using a transfer learning approach in Tensorflow with NumPy and Pandas for data preprocessing",
      image: "/colorizer22.png"
    },
    {
      id: 2,
      title: "SafeSpace",
      description: "Built a twitter-like social media app in React with Firebase that uses NLP moderation to filter for toxicity and hatespeech, filtering it out before it hits the platform.",
      image: "/ss2.png"
    },
    {
      id: 3,
      title: "Versus",
      description: "Built an LLM benchmarking platform to score and test performance across reasoning tasks by using WebHooks to connect LLM APIs to games such as chess and wordle that also show the user the game progress.",
      image: "/versusapp.png"
    }
  ];

  return (
    <div 
      ref={projectsRef}
      id="projects" 
      className="projects-container" 
      style={{
        position: 'absolute',
        top: '1200px', // Back to reasonable desktop spacing
        left: '50%',
        transform: 'translateX(-50%)', // Center horizontally like Experience
        zIndex: 10,
        width: '90%', // Use percentage like Experience
        maxWidth: '1200px', // Maximum width constraint like Experience
        minWidth: '320px', // Minimum width like Experience
        overflow: 'hidden',
        paddingBottom: '80px' // Add breathing room at the bottom
      }}
    >
      {/* Section Title */}
      <h2 
        className="projects-title"
        style={{
          fontSize: '1.5rem',
          color: 'rgba(255, 255, 255, 0.75)',
          fontFamily: 'NeueMontreal-MediumItalic, sans-serif',
          fontStyle: 'italic',
          margin: '0 0 1rem 0',
          fontWeight: '500',
          opacity: titleAnimated ? 1 : 0,
          transform: titleAnimated ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}>
        Projects
      </h2>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%'
      }}>
        {projects.map((project) => {
          const isAnimated = animatedCards.has(project.id.toString());
          return (
            <div 
              key={project.id} 
              data-project-id={project.id}
              className={`project-card glass-project-card ${isAnimated ? 'animated' : ''}`}
              onClick={() => {
                if (project.title === "Colornet") {
                  window.open("https://github.com/YuvDwi/ColorNet", "_blank", "noopener,noreferrer");
                } else if (project.title === "SafeSpace") {
                  window.open("https://github.com/YuvDwi/SafeSpace", "_blank", "noopener,noreferrer");
                } else if (project.title === "Versus") {
                  window.open("https://github.com/YuvDwi/Versus", "_blank", "noopener,noreferrer");
                }
              }}
              style={{
                cursor: (project.title === "Colornet" || project.title === "SafeSpace" || project.title === "Versus") ? "pointer" : "default"
              }}
            >
              {/* Project Image */}
              <div style={{
                width: '100%',
                height: '200px',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.55
                  }}
                />
              </div>

              {/* Project Content */}
              <h3 style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                color: 'rgba(255, 255, 255, 0.75)',
                fontFamily: 'NeueMontreal-Medium, sans-serif',
                fontStyle: 'normal',
                margin: '0 0 1rem 0',
                fontWeight: '500',
                wordWrap: 'break-word',
                overflowWrap: 'break-word'
              }}>
                {project.title}
              </h3>

              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                fontFamily: 'NeueMontreal-Light, sans-serif',
                lineHeight: '1.6',
                margin: 0,
                fontWeight: '300',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                hyphens: 'auto',
                letterSpacing: '0.01em'
              }}>
                {project.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @font-face {
          font-family: 'NeueMontreal-MediumItalic';
          src: url('/NeueMontreal-MediumItalic.otf') format('opentype');
          font-weight: 500;
          font-style: italic;
        }
        
        @font-face {
          font-family: 'NeueMontreal-Light';
          src: url('/NeueMontreal-Light.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
        }
        
        .glass-project-card {
          position: relative;
          background: rgba(128, 128, 128, 0.12);
          border-radius: 20px;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          padding: 1.5rem;
          overflow: hidden;
          box-sizing: border-box;
          transition: all 0.3s ease;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .glass-project-card.animated {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .glass-project-card:hover {
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
          transform: translateZ(10px) scale(1.02);
          transition: all 0.3s ease;
        }
        
        .glass-project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        }
        
        .glass-project-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent, rgba(255, 255, 255, 0.1));
          pointer-events: none;
        }
        
        /* Responsive spacing to prevent overlap with Experience cards */
        @media (max-width: 1024px) {
          .projects-container {
            top: 1250px !important; /* Spacing for 1024px and below */
          }
        }
        
        @media (max-width: 768px) {
          .projects-container {
            top: 1380px !important; /* Spacing for 768px and below */
            width: calc(95% - 40px) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            min-width: 300px !important;
            padding: 0 20px 80px 20px !important; /* Added bottom padding for breathing room */
          }
        }
        
        @media (max-width: 626px) {
          .projects-container {
            top: 1500px !important; /* Spacing for 626px and below */
          }
        }
        
        @media (max-width: 480px) {
          .projects-container {
            top: 1450px !important; /* Spacing for 480px and below */
            width: calc(98% - 40px) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            min-width: 280px !important;
            padding: 0 20px 80px 20px !important; /* Added bottom padding for breathing room */
          }
        }
        
        @media (max-width: 416px) {
          .projects-container {
            top: 1480px !important; /* Spacing for 416px and below */
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
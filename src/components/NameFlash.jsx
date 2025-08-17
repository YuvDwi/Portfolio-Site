import { useState, useEffect } from 'react';

const NameFlash = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [textOpacity, setTextOpacity] = useState(1);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  useEffect(() => {
    // Start text fade out after 1.5 seconds
    const textFadeTimer = setTimeout(() => {
      setTextOpacity(0);
    }, 1500);

    // Start background fade out after 2.5 seconds
    const backgroundFadeTimer = setTimeout(() => {
      setBackgroundOpacity(0);
    }, 2500);

    // Hide component after fade completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearTimeout(textFadeTimer);
      clearTimeout(backgroundFadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      zIndex: 1000,
      opacity: backgroundOpacity,
      transition: 'opacity 1s ease-out',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'MenoBanner-Condensed, sans-serif',
        fontStyle: 'italic',
        margin: 0,
        opacity: textOpacity,
        transition: 'opacity 0.8s ease-out'
      }}>
        Yuvraj Dwivedi
      </h1>
      
      {/* Font Declaration */}
      <style>{`
        @font-face {
          font-family: 'MenoBanner-Condensed';
          src: url('/meno-banner-condensed-italic.otf') format('opentype');
          font-weight: normal;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default NameFlash;

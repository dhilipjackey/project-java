import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    navbar: {
      position: 'sticky',
      top: '0',
      background: 'linear-gradient(to right, black, gray)',  // Gradient background
      padding: '15px 40px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      zIndex: '10',
      animation: isVisible ? 'fadeInDown 0.5s ease forwards' : 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '10px',
      margin: '20px 15px ',
      width:'98%',
      cursor:'pointer'
    },
    title: {
      color: '#fff',
      fontSize: '2em',
      fontWeight: '700',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      margin: '0',
    },
    navList: {
      listStyleType: 'none',
      display: 'flex',
      margin: '0',
    },
    navItem: {
      color: '#fff',
      fontSize: '1.1em',
      fontWeight: '500',
      margin: '0 20px',
      cursor: 'pointer',
      position: 'relative',
      transition: 'color 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
    },
    underline: {
      position: 'absolute',
      bottom: '-5px',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: '#fff',
      transform: 'scaleX(0)',
      transformOrigin: 'bottom right',
      transition: 'transform 0.3s ease',
    },
    navItemHovered: {
      color: 'gray',  // Color change on hover
    }
  };

  const handleNavigate = (section) => {
    if (section === 'ABOUT US') {
      const aboutSection = document.getElementById('about-us');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the respective route
      navigate(`/${section.toLowerCase().replace(' ', '-')}`);
    }
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.title}>CloudTech</h2>
      <ul style={styles.navList}>
        {['Data user', 'Data owner', 'Admin login'].map((item) => (
          <li key={item} style={styles.navItem}>
            <span
              onClick={() => handleNavigate(item)} // Handle navigation or scrolling
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff6f61';  // Hover color change
                const underline = e.currentTarget.querySelector('.underline');
                underline.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#fff';  // Reset color on leave
                const underline = e.currentTarget.querySelector('.underline');
                underline.style.transform = 'scaleX(0)';
              }}
            >
              {item}
              <span className="underline" style={styles.underline}></span>
            </span>
          </li>
        ))}
      </ul>

      {/* Keyframes for fadeInDown effect */}
      <style>
        {`
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Navbar;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function DataUserNavbar({ email, onLogout }) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const styles = {
    navbar: {
      position: 'sticky',
      top: '20px',
      backgroundColor: 'black',
      padding: '10px 20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
      zIndex: 10,
      animation: isVisible ? 'fadeInDown 0.5s ease forwards' : 'none',
      width: '95%',
      height: '70px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '5px',
      marginLeft: '30px',
      cursor:'pointer'
    },
    title: {
      color: 'white',
      fontSize: '1.8em',
      fontWeight: 'bold',
    },
    navList: {
      listStyleType: 'none',
      display: 'flex',
    },
    navItem: {
      marginRight: '25px',
      cursor: 'pointer',
      color: 'white',
      position: 'relative',
      fontSize: '1.1em',
      transition: 'color 0.3s ease',
      fontWeight: 'bold',
    },
    underline: {
      position: 'absolute',
      left: '50%',
      bottom: '-5px',
      width: '100%',
      height: '2px',
      backgroundColor: 'white',
      transform: 'translateX(-50%) scaleX(0)',
      transition: 'transform 0.3s ease',
    },
    logoutButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1em',
      marginLeft: '20px',
    },
    userEmail: {
      color: '#ccc',
      marginLeft: '20px',
    },
  };

  const handleNavigation = (item) => {
    if (item === 'UPLOAD AND MANAGE FILES') {
      navigate('/upload'); // Navigate to the Upload Files page
    } else if (item === 'MANAGE FILES') {
      navigate('/manage'); // Navigate to the Manage Files page
    }
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.title}>CLOUDTECH</h2>
      <ul style={styles.navList}>
        {['UPLOAD AND MANAGE FILES'].map((item) => (
          <li key={item} style={styles.navItem}>
            <span
              onClick={() => handleNavigation(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.fontSize = '18px';
                const underline = e.currentTarget.querySelector('.underline');
                underline.style.transform = 'translateX(-50%) scaleX(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
                const underline = e.currentTarget.querySelector('.underline');
                underline.style.transform = 'translateX(-50%) scaleX(0)';
              }}
            >
              {item}
              <span className="underline" style={styles.underline}></span>
            </span>
          </li>
        ))}
      </ul>
      <div>
        {email && <span style={styles.userEmail}>Logged in as: <strong>{email}</strong></span>}
        <button onClick={onLogout} style={styles.logoutButton}><b>LOGOUT</b></button>
      </div>

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

export default DataUserNavbar;

import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { FaLock, FaCloud, FaDatabase } from 'react-icons/fa';

function Home() {
  const [showAWS, setShowAWS] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); // Track hovered card
  const awsContentRef = useRef(null);
  const contactRef = useRef(null);
  const benefitsRef = useRef(null);
  const aboutRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setShowAWS(true);
    setShowContact(true);
    setTimeout(() => setShowBenefits(true), 500);
    setTimeout(() => setShowAbout(true), 1000);
  }, []);

  const scrollToSection = (section) => {
    if (section === 'ABOUT US') {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      awsContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const styles = {
    homeContainer: {
      height: '250vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '60px',
      height: '100vh',
    },
    textContainer: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#f4f4f4',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflowY: 'auto',
      marginTop: '-50px',
    },
    gifContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gif: {
      width: '100%',
      height: 'auto',
      maxHeight: '500px',
    },
    header: {
      fontSize: '2.5em',
      marginBottom: '20px',
      color: '#333',
      textShadow: '2px 2px 4px rgba(0,0,0,0.30)',
     
      cursor:'pointer'
    },
    paragraph: {
      fontSize: '1.2em',
      lineHeight: '1.6',
      color: '#555',
      textAlign:'justify'
    },
    list: {
      listStyleType: 'circle',
      paddingLeft: '20px',
    },
    awsSection: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#0C090C',
      color: '#fff',
      padding: '40px 20px',
      textAlign: 'left',
      marginTop: '40px',
      animation: showAWS ? 'fadeInRight 1s ease forwards' : 'none',
    },
    awsTextContainer: {
      flex: 1,
      marginRight: '20px',
    },
    awsHeader: {
      fontSize: '2em',
      marginBottom: '10px',
    },
    awsGif: {
      width: '50%',
      maxHeight: '250px',
      animation: showAWS ? 'fadeInRight 1s ease forwards' : 'none',
      cursor: 'pointer',
    },
    aboutSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40px',
      animation: showAbout ? 'fadeInLeft 1s ease forwards' : 'none',
    },
    aboutHeader: {
      fontSize: '2em',
      marginBottom: '20px',
      fontWeight: 'bolder',
    },
    profilesContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      maxWidth: '1200px',
      margin: '20px 0',
    },
    profileCard: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      width: '18%',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.3s', // Smooth transition for scaling
      perspective: '1000px', // Perspective for 3D effect
    },
    profileImage: {
      borderRadius: '50%',
      width: '100px',
      height: '110px',
      marginBottom: '10px',
      transition: 'transform 0.3s', // Smooth transition for image scaling
    },
    contactContainer: {
      backgroundColor: 'black',
      padding: '40px',
      marginTop: '40px',
      textAlign: 'center',
      animation: showContact ? 'fadeInUp 1s ease forwards' : 'none',
     
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      color: 'white',
    },
    contactHeader: {
      fontSize: '2em',
      marginBottom: '20px',
      fontWeight: 'bolder',
    },
    input: {
      padding: '10px',
      margin: '10px',
      width: '50%',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#61fb69',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s', // Transition for hover effect
    },
    buttonHover: {
      backgroundColor: 'green', // Darker blue on hover
    },
    benefitsList: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      opacity: showBenefits ? 1 : 0,
      transform: showBenefits ? 'translateX(0)' : 'translateX(-20px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    },
    benefitIcon: {
      marginRight: '10px',
    },
  };
  const buttonStyle = {
    backgroundColor: hovered ? 'red' : 'orange',
    width: '150px',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hovered ? 'scale(1.05)' : 'scale(1)',
    fontWeight:'bolder'
  };

  return (
    <div style={styles.homeContainer}>
      <Navbar onNavigate={scrollToSection} />
      <div style={styles.content}>
        <div style={styles.textContainer}>
          <h1 style={styles.header}>Attribute-Based Proxy Re-Encryption With Direct 
          Revocation Mechanism for Data Sharing in Clouds</h1>
          <p style={styles.paragraph}>
            In this project, we focus on securely storing data in the AWS Cloud using advanced encryption methods. 
            AWS offers a range of services that allow for robust data management and security, ensuring that 
            sensitive information is protected.
          </p>
          <h2 style={styles.header}>KEY BENEFITS:</h2>
          <div style={styles.benefitsList} ref={benefitsRef}>
            <div style={styles.benefitItem}>
              <FaLock size={30} style={styles.benefitIcon} />
              <span>Scalability: Easily scale storage needs as your data grows.</span>
            </div>
            <div style={styles.benefitItem}>
              <FaCloud size={30} style={styles.benefitIcon} />
              <span>Security: Utilize built-in security features such as encryption and access control.</span>
            </div>
            <div style={styles.benefitItem}>
              <FaDatabase size={30} style={styles.benefitIcon} />
              <span>Reliability: Benefit from AWS's high availability and disaster recovery options.</span>
            </div>
          </div>
          <p style={styles.paragraph}>
            By leveraging AWS services like S3 and RDS, organizations can efficiently manage their data while 
            ensuring it remains secure. This project aims to demonstrate how to set up a secure data storage 
            solution using AWS.
          </p>
          <button
      style={buttonStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      GET STARTED
    </button>
        </div>
        <div style={styles.gifContainer}>
          <img 
            src="https://www.cyanous.com/img/cloud-1.gif" 
            alt="AWS Cloud Storage" 
            style={styles.gif} 
          />
        </div>
      </div>

      {/* Why Choose AWS Section */}
      <div style={styles.awsSection} ref={awsContentRef}>
        <div style={styles.awsTextContainer}>
          <h2 style={styles.awsHeader}>Why Choose AWS?</h2>
          <p style={styles.paragraph}>
            AWS provides a robust infrastructure for storing and managing your data securely in the cloud. Here’s why:
          </p>
          <ul style={styles.list}>
            <li>Global Reach: AWS has data centers across the globe, allowing for low-latency access and redundancy.</li>
            <li>Innovation: With a constant stream of new features and services, AWS enables organizations to stay ahead in technology.</li>
            <li>Cost Management: Flexible pricing models help organizations manage their budgets effectively while using cutting-edge technology.</li>
          </ul>
        </div>
        <div style={styles.gifContainer}>
          <img 
            src="https://img.freepik.com/premium-photo/illustration-neon-color-cloud-with-rain-dark-background-ai_564714-5194.jpg" 
            alt="Why Choose AWS" 
            style={styles.awsGif} 
          />
        </div>
      </div>

      {/* About Us Section */}
      <div id="about-us" style={styles.aboutSection} ref={aboutRef}>
        <h2 style={styles.aboutHeader}>ABOUT US</h2>
        <div style={styles.profilesContainer}>
          {[0, 1, 2, 3, 4].map((index) => (
            <div 
              key={index} 
              className={`profileCard ${hoveredCard === index ? 'hovered' : ''}`} 
              style={{ 
                ...styles.profileCard, 
                transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)', 
                transition: 'transform 0.3s' 
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={
                  index === 0 
                    ? "https://www.shutterstock.com/image-photo/male-programmer-laptop-on-white-260nw-1386609791.jpg" 
                    : index === 1 
                    ? "https://static.vecteezy.com/system/resources/thumbnails/052/289/650/small/female-coder-working-in-a-modern-office-engaging-with-digital-data-and-cybersecurity-elements-photo.jpg" 
                    : index === 2 
                    ? "https://photos.peopleimages.com/picture/201701/1449152-hes-never-far-from-his-laptop-fit_400_400.jpg" // Add image URL for the third profile
                    : index === 3 
                    ? "https://static.vecteezy.com/system/resources/previews/045/782/238/non_2x/a-woman-in-glasses-smiles-at-a-computer-monitor-in-a-room-photo.jpg" // Add image URL for the fourth profile
                    : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA5L3Jhd3BpeGVsb2ZmaWNlMl9hX3BvcnRyYWl0X3Bob3RvX2FuX2F0dHJhY3RpdmVfeW91bmdfYWR1bHRfd29tYV84ZmEwN2UxMS03NTkwLTQ4MDMtODQ2ZC0wMjhkYzNhMTgzNWMucG5n.png" // Add image URL for the fifth profile
                } 
                alt={`Profile ${index + 1}`} 
                style={{ 
                  ...styles.profileImage, 
                  transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)' 
                }} 
              />
              <h3>{index === 0 ? 'John Doe' : index === 1 ? 'Jane Smith' : index === 2 ? 'Mark Wilson' : index === 3 ? 'Lucy Brown' : 'Emily Johnson'}</h3>
              <p>{index === 0 ? 'Founder & CEO. Passionate about data security and cloud technologies.' : 
                index === 1 ? 'CTO. Expert in encryption algorithms and cloud architecture.' : 
                index === 2 ? 'Product Manager. Focused on innovative solutions for cloud services.' :
                index === 3 ? 'Software Engineer. Experienced in building scalable applications.' :
                'Data Scientist. Focused on leveraging data for business insights.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div style={styles.contactContainer} ref={contactRef}>
        <h2 style={styles.contactHeader}>CONTACT US</h2>
        <form>
          <input 
            type="text" 
            placeholder="Your Name" 
            style={styles.input} 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            style={styles.input} 
            required 
          />
          <textarea 
            rows="4" 
            placeholder="Your Message" 
            style={styles.input} 
            required 
          />
          <br />
          <button 
            type="submit" 
            style={styles.button} 
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            <b>SEND MESSAGE</b>
          </button>
        </form>
      </div>

      {/* Keyframes for animations */}
      <style>
        {`
          @keyframes fadeInRight {
            0% {
              opacity: 0;
              transform: translateX(20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInLeft {
            0% {
              opacity: 0;
              transform: translateX(-20px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .profileCard.hovered {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

export default Home;

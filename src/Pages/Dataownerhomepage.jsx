import React, { useState } from 'react';
import Navbar from '../Pages/Dataownernavbar';
import 'animate.css'; // Import Animate.css

function DataOwnerHomepage() {
  const email = sessionStorage.getItem('dataOwnerEmail');
  const [activeCard, setActiveCard] = useState(null);
  const [animationEnded, setAnimationEnded] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem('dataOwnerEmail');
    window.location.href = '/';
  };

  const handleCardClick = (index) => {
    if (animationEnded) {
      setActiveCard(index);
      setAnimationEnded(false);

      // Reset the active card state after the animation duration
      setTimeout(() => {
        setActiveCard(null);
        setAnimationEnded(true);
      }, 1000); // Duration of the hinge animation
    }
  };

  return (
    <div className="homepage">
      <Navbar email={email} onLogout={handleLogout} />
      <br />
      <main className="content">
        <h2>Welcome, Data Owner!</h2>
        {email && <p>Your email: <strong>{email}</strong></p>}
        <p>Here you can manage your data and settings.</p>
        <button className="action-button">Go to Dashboard</button>

        <section className="card-container">
          {['Upload Files', 'Download Files', 'Manage Files', 'Re-encryption', 'AWS Storage'].map((title, index) => (
            <div
              key={index}
              className={`card ${activeCard === index ? 'animate__animated animate__hinge' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <i className={`fa fa-${index === 0 ? 'upload' : index === 1 ? 'download' : index === 2 ? 'cogs' : index === 3 ? 'lock' : 'cloud'} icon`}></i>
              <h3>{title}</h3>
              <p>{`Manage your ${title.toLowerCase()}.`}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 CloudTech. All rights reserved.</p>
      </footer>

      <style jsx>{`
        .homepage {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f4f4f4;
        }

        .content {
          flex: 1;
          padding: 20px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin: 20px;
        }

        .action-button {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .action-button:hover {
          background-color: #0056b3;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .card {
          padding: 15px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s;
          position: relative;
          cursor: pointer;
        }

        .icon {
          font-size: 30px;
          color: #007bff;
          margin-bottom: 10px;
        }

        .footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px 0;
        }
      `}</style>
    </div>
  );
}

export default DataOwnerHomepage;

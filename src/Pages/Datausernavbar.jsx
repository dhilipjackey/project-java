import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Datausernavbar({ email }) {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleLogout = () => {
    sessionStorage.removeItem('dataUserEmail');
    navigate('/'); // Change this to your login page route if necessary
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  };

  const navigateTo = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <div>
      <style>
        {`
          .navbar {
            background: #333;
            color: white;
            padding: 20px;
            border-radius: 5px;
            position: relative;
            display: inline-block;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s;
            width: 1550px;
            height: 70px;
            margin-left: 30px;
            margin-top: 15px;
            overflow: hidden; /* To handle right-to-left animation */
          }
          
          .navbar ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            gap: 15px;
            animation: slideIn 0.5s forwards; /* Animation for slide-in effect */
          }
          
          @keyframes slideIn {
            from {
              transform: translateX(100%); /* Start off-screen right */
            }
            to {
              transform: translateX(0); /* Move to original position */
            }
          }
          
          .navbar li {
            padding: 10px 15px;
            border-radius: 5px;
            transition: transform 0.3s, background-color 0.3s;
            cursor: pointer;
          }
          
          .navbar li:hover {
            color: lightblue;
            transform: translateY(-5px) rotateY(10deg); /* 3D effect */
          }
          
          .navbar li:active {
            transform: translateY(2px); /* Add a press effect */
          }
          
          .logout-button {
            background-color: #e74c3c; /* Red background */
            color: white; /* White text */
            border: none; /* No border */
            padding: 10px 15px; /* Padding for button */
            border-radius: 5px; /* Rounded corners */
            transition: background-color 0.3s, transform 0.3s; /* Transition effects */
            margin-top: -5px;
            height: 40px;
          }
          
          .logout-button:hover {
            background-color: red; /* Darker red on hover */
            color: whitesmoke;
            transform: translateY(-15px); /* Lift effect */
          }
          
          .logout-button:active {
            transform: translateY(12px); /* Press effect */
          }
        `}
      </style>
      
      <div className="navbar">
        <ul>
          <li style={{color:'whitesmoke',fontSize:'25px',marginTop:'-15px',fontWeight:'bold'}}>CLOUDTECH</li>
          <li style={{marginTop:'-5px'}} onClick={() => navigateTo('/userhomepage')}><b>HOMEPAGE</b></li>
          <li style={{marginTop:'-5px'}} onClick={() => navigateTo('/datauserdownload')}><b>DOWNLOAD FILES</b></li>
          {email && <li>{email}</li>} {/* Display email in navbar */}
          <li onClick={handleLogout} className="logout-button"><b>LOGOUT</b></li> {/* Logout item */}
        </ul>
      </div>
    </div>
  );
}

export default Datausernavbar;

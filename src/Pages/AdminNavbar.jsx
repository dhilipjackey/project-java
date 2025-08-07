import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function AdminNavbar() {
  const handleLogout = () => {
    console.log('Logout button clicked');
    window.location.href = '/'; // Adjust the path as needed
  };

  const links = [
 
    { path: '/dataowner', name: 'DATA OWNER DIRECTORY' },
    { path: '/datauser', name: 'DATA USER DIRECTORY' },
    { path: '/managefiles', name: 'MANAGE FILES DIRECTORY' },
    { path: '/filepermission', name: 'FILES PERMISSION DIRECTORY' },
  ];

  return (
    <div>
      <Navbar expand="lg" style={navbarStyle}>
        <Navbar.Brand style={brandStyle}>
          <strong>CLOUDTECH</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {links.map((link, index) => (
              <Nav.Link
                key={index}
                href={link.path}
                style={linkStyle}
                className="nav-link"
              >
                <strong>{link.name}</strong>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
        <Button onClick={handleLogout} style={buttonStyle} className="logout-button">
          <strong>LOGOUT</strong>
        </Button>
      </Navbar>

      <style>
        {`
          .navbar {
            background-color: black;
            padding: 10px 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }

          .navbar-brand {
            font-family: Arial, sans-serif;
            font-size: 24px;
            color: #fff;
          }

          .nav-link {
            font-family: Arial, sans-serif;
            font-size: 18px;
            color: #ccc;
            margin-left: 15px;
            position: relative;
            transition: color 0.3s ease, transform 0.3s ease;
          }

          .nav-link:hover {
            color: wheat;
            transform: scale(1.1); /* Scale effect on hover */
          }

          .logout-button {
            background-color: red;
            margin-left: 15px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .logout-button:hover {
            background-color: darkred; /* Darker red on hover */
            transform: scale(1.05); /* Scale effect on hover */
          }
        `}
      </style>
    </div>
  );
}

const navbarStyle = {
  padding: '10px 20px',
};

const brandStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '24px',
  color: '#fff',
};

const linkStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '18px',
  color: '#ccc',
  marginLeft: '15px',
};

const buttonStyle = {
  backgroundColor: 'red',
};

export default AdminNavbar;

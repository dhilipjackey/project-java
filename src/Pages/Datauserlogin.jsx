import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../Pages/Navbar';
import axios from 'axios';

function DataUserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6900/api/datauser/login', {
        email,
        password,
      });
      setError(false);

      // Store email in session storage
      sessionStorage.setItem('dataUserEmail', email);

      navigate('/userhomepage'); // Navigate to the user homepage
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div style={styles.page}>
      <HomeNavbar />
      <Container style={styles.container}>
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit} style={styles.form}>
              <h2 className="text-center"><strong>DATA USER LOGIN</strong></h2>
              <br />
              {error && <Alert variant="danger">Incorrect credentials</Alert>}
              <Form.Group controlId="formEmail">
                <Form.Label><strong>EMAIL</strong></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formPassword">
                <Form.Label><strong>PASSWORD</strong></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" style={styles.button}>
                <strong>LOGIN</strong>
              </Button>
            </Form>
          </Col>
          <Col md={6} style={styles.gifContainer}>
            <img src="https://media4.giphy.com/media/TGROKbWqxXplM7aznn/giphy.gif?cid=6c09b9520rpe4aws1xyivpcgpdj8w4i5h9ypuxl9puimj6cf&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Loading" style={styles.gif} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const styles = {
  page: {
    overflow: 'hidden', // Hide the scrollbar
  },
  container: {
    height: '85vh',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '300px',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  button: {
    width: '100%',
    marginTop: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.90)',
    transition: 'box-shadow 0.3s ease-in-out',
  },
  gifContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'-100px'
  },
  gif: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default DataUserLogin;

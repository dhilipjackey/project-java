import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../Pages/Navbar';

function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setError(false);
      navigate('/dataowner'); // Navigate to the dashboard or any other route
    } else {
      setError(true);
    }
  };

  return (
    <div style={styles.page}>
      <HomeNavbar />
      <Container style={styles.container}>
        <Row className="justify-content-center align-items-center" >
          <Col md={6}>
            <Form onSubmit={handleSubmit} style={styles.form}>
              <h2 className="text-center"><strong>ADMIN LOGIN FORM</strong></h2>
              <br/>
              {error && <Alert variant="danger">Incorrect credentials</Alert>}
              <Form.Group controlId="formUsername">
                <Form.Label><strong>USERNAME</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
               <br/>
              <Form.Group controlId="formPassword">
                <Form.Label><strong>PASSWORD</strong></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="success" type="submit" style={styles.button}>
                <strong>LOGIN</strong>
              </Button>
            </Form>
          </Col>
          <Col md={6} style={styles.gifContainer}>
            <img src="https://flatlogic.com/blog/wp-content/uploads/2018/08/article_openSource-600x450.png" alt="Loading" style={styles.gif} />
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
    marginLeft:'300px'
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width:'400px'
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
  },
  gif: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default Adminlogin;

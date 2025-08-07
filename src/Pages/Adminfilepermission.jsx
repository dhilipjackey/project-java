import React, { useEffect, useState } from 'react';
import { Table, Button, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const FileRequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:6900/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:6900/api/requests/${id}`, { status });
      setToastMessage(`Request ${status} successfully!`);
      setShowToast(true);
      setRequests(prev => prev.map(req => (req.id === id ? { ...req, status } : req)));
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  // Internal styles
  const styles = {
    hoverEffect: {
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    hoverEffectHover: {
      transform: 'scale(1.01)',
      boxShadow: '0 15px 15px lightblue'
    }
  };

  return (
    <div>
      <AdminNavbar /><br /><br />
      <div>
        <ToastContainer position="top-end" className="p-3">
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
        <h1 style={{ cursor: 'pointer', color: 'gray' }}><b>FILE PERMISSION</b></h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>FILE NAME</th>
              <th>EMAIL ID</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                style={styles.hoverEffect}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.hoverEffectHover.transform;
                  e.currentTarget.style.boxShadow = styles.hoverEffectHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <td>{request.id}</td>
                <td>{request.fileName}</td>
                <td>{request.email}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Pending' && (
                    <>
                      <Button variant="success" onClick={() => updateStatus(request.id, 'Accepted')}><b>ACCEPT</b></Button>&nbsp;&nbsp;
                      <Button variant="danger" onClick={() => updateStatus(request.id, 'Declined')}><b>DECLINE</b></Button>
                    </>
                  )}
                  {request.status === 'Accepted' && (
                    <Button variant="warning" onClick={() => updateStatus(request.id, 'Pending')}><b>REVOKE ACCEPT</b></Button>
                  )}
                  {request.status === 'Declined' && (
                    <Button variant="warning" onClick={() => updateStatus(request.id, 'Pending')}><b>REVOKE DECLINE</b></Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default FileRequestTable;

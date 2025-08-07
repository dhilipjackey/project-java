import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import DataUserNavbar from './Datausernavbar';
import './DataUserHomepage.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Datauserdownload() {
  const email = sessionStorage.getItem('dataUserEmail');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:6900/api/requests/byEmail?email=${email}`);
        setRequests(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [email]);

  const handleDownload = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  const confirmDownload = async () => {
    if (secretKey === selectedFile.secretKey) {
      try {
        const response = await axios.get(`http://localhost:6900/files/download/${selectedFile.fileName}`, {
          responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', selectedFile.fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setShowModal(false);
        setSecretKey('');
      } catch (error) {
        console.error('Download failed:', error);
      }
    } else {
      toast.error('Wrong secret key. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <DataUserNavbar email={email} />
      <ToastContainer />
      <div style={{ marginTop: '50px' }}>
        <h1><b>FILE DOWNLOAD</b></h1>
        <Table striped bordered hover responsive className="file-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FILE NAME</th>
              <th>EMAIL ID</th>
              <th>SECRET KEY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} className="file-row">
                <td>{request.id}</td>
                <td>{request.fileName}</td>
                <td>{request.email}</td>
                <td>{request.status === 'Accepted' ? request.secretKey : '*******'}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'Accepted' && (
                    <button onClick={() => handleDownload(request)} className="btn btn-success">
                      <b>DOWNLOAD</b>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Secret Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the secret key to download the file:</p>
          <input 
            type="text" 
            value={secretKey} 
            onChange={(e) => setSecretKey(e.target.value)} 
            className="form-control" 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Datauserdownload;

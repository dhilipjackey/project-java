import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import DataUserNavbar from './Datausernavbar';
import './DataUserHomepage.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DataUserHomepage() {
  const email = sessionStorage.getItem('dataUserEmail');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:6900/files/all');
        setFiles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleShowFileRequest = async (file) => {
    const userEmail = sessionStorage.getItem('dataUserEmail');
    try {
      await axios.post('http://localhost:6900/api/requests', {
        fileName: file.fileName,
        secretKey: file.secretKey, // Ensure you have the secretKey from the file if needed
        email: userEmail, // Use the email from session storage
      });
      toast.success('File request sent successfully!');
    } catch (error) {
      toast.error('Failed to send file request.');
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
        <h1><b>FILE DETAILS</b></h1>
        <Table striped bordered hover responsive className="file-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>FILE NAME</th>
              <th>EMAIL ID</th>
              <th>ENCRYPTED DATA</th>
              <th>RE-ENCRYPTED DATA</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id} className="file-row">
                <td>{file.id}</td>
                <td>{file.fileName}</td>
                <td>{file.email}</td>
                <td>{file.encryptedKeyStore}</td>
                <td>{file.reencryptedData}</td>
                <td>
                  <button onClick={() => handleShowFileRequest(file)} className="btn btn-primary">
                    <b>SEND FILE REQUEST</b>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default DataUserHomepage;

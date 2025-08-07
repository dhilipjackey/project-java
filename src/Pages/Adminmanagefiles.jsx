import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import './Adminmanagefiles.css'; // Import your CSS file for custom styles

function Adminmanagefiles() {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <AdminNavbar />
      <br/>
      <h1><b>FILE DETAILS</b></h1>
      <Table striped bordered hover className="file-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FILE NAME</th>
            <th>EMAIL ID</th>
            <th>SECRET KEY</th>
            <th>ENCRYPTED DATA</th>
            <th>RE-ENCRYPTED DATA</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id} className="file-row">
                <td>{file.id}</td>
              <td>{file.fileName}</td>
              <td>{file.email}</td>
              <td>{file.secretKey}</td>
              <td>{file.encryptedKeyStore}</td>
              <td>{file.reencryptedData}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Adminmanagefiles;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DataOwner.css'; // Import the CSS file
import AdminNavbar from './AdminNavbar';
import { FaCheck } from 'react-icons/fa'; // Import an icon for the button

function DataOwner() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataOwners, setDataOwners] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  useEffect(() => {
    fetchDataOwners();
  }, []);

  const fetchDataOwners = async () => {
    try {
      const response = await axios.get('http://localhost:6900/api/dataowner/all');
      setDataOwners(response.data);
    } catch (error) {
      console.error('Error fetching data owners', error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submission

    // Set a timeout for 4 seconds before sending the data
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:6900/api/dataowner/register', {
          username,
          email,
          password,
        });
        toast.success(response.data);
        fetchDataOwners(); // Refresh data owners list
        setUsername('');
        setEmail('');
        setPassword('');
      } catch (error) {
        toast.error(error.response.data);
      } finally {
        setIsSubmitting(false); // End submission
      }
    }, 4000); // Delay of 4000ms (4 seconds)
  };

  return (
    <div>
      <AdminNavbar />
      <br/>
      <div style={styles.container}>
        <ToastContainer />
        <div style={styles.formContainer}>
          <h1 style={styles.header}><b>DATA OWNER ACCOUNT SETUP</b></h1>
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button} disabled={isSubmitting}>
              {isSubmitting ? <FaCheck style={styles.icon} /> : null} 
              <b>STORE DATA</b>
            </button>
          </form>
        </div>

        <h2 style={styles.subHeader}><b>DATA OWNER ACCOUNT DETAILS</b></h2>
        <div style={styles.dataTableContainer}>
          <div style={styles.dataTable}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>USERNAME</th>
                  <th style={styles.th}>EMAIL ID</th>
                  <th style={styles.th}>PASSWORD</th>
                </tr>
              </thead>
              <tbody>
                {dataOwners.map((owner) => (
                  <tr key={owner.id} className="table-row">
                    <td style={styles.td}>{owner.id}</td>
                    <td style={styles.td}>{owner.username}</td>
                    <td style={styles.td}>{owner.email}</td>
                    <td style={styles.td}>{owner.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px',
    background: '#f9f9f9',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
  },
  formContainer: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
  },
  header: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '12px',
    background: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s, transform 0.2s',
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    marginRight: '8px',
    animation: 'spin 0.5s ease-in-out',
  },
  subHeader: {
    marginTop: '20px',
    color: 'gray',
  },
  dataTableContainer: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    textAlign: 'left',
    background: 'gray',
    color: 'white',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
};

export default DataOwner;

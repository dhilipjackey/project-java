import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Pages/AdminNavbar';
import { FaUserShield, FaFileUpload, FaLock, FaCloud } from 'react-icons/fa';

function AdminHomepage() {
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showFileManagement, setShowFileManagement] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  useEffect(() => {
    setShowUserManagement(true);
    setTimeout(() => setShowFileManagement(true), 500);
    setTimeout(() => setShowPermissions(true), 1000);
  }, []);

  const styles = {
    adminContainer: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#eef2f3',
    },
    header: {
      fontSize: '2.5em',
      color: '#333',
      textAlign: 'center',
      marginBottom: '20px',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    section: {
      margin: '20px 0',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    sectionHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    },
    sectionHeader: {
      fontSize: '1.8em',
      marginBottom: '10px',
      borderBottom: '2px solid #61fb69',
      paddingBottom: '5px',
      color: '#444',
    },
    paragraph: {
      fontSize: '1.1em',
      lineHeight: '1.6',
      color: '#555',
    },
    icon: {
      marginRight: '10px',
      color: '#61fb69',
    },
    list: {
      listStyleType: 'circle',
      paddingLeft: '20px',
      color: '#555',
    },
  };

  return (
    <div>
        <AdminNavbar/>
    <div style={styles.adminContainer}>
      <h1 style={styles.header}><strong>ADMIN DASHBOARD</strong></h1>

      {/* User Management Section */}
      <div 
        style={{ ...styles.section, opacity: showUserManagement ? 1 : 0 }} 
        className="section"
        onMouseEnter={(e) => e.currentTarget.style = { ...styles.section, ...styles.sectionHover }}
        onMouseLeave={(e) => e.currentTarget.style = styles.section}
      >
        <h2 style={styles.sectionHeader}>
          <FaUserShield style={styles.icon} /> User Management
        </h2>
        <p style={styles.paragraph}>
          Manage data users and data owners. You can create, edit, and delete accounts as needed.
        </p>
        <ul style={styles.list}>
          <li>Create new user accounts</li>
          <li>Edit existing user details</li>
          <li>Delete users when necessary</li>
        </ul>
      </div>

      {/* File Management Section */}
      <div 
        style={{ ...styles.section, opacity: showFileManagement ? 1 : 0, transitionDelay: '500ms' }} 
        className="section"
        onMouseEnter={(e) => e.currentTarget.style = { ...styles.section, ...styles.sectionHover }}
        onMouseLeave={(e) => e.currentTarget.style = styles.section}
      >
        <h2 style={styles.sectionHeader}>
          <FaFileUpload style={styles.icon} /> File Management
        </h2>
        <p style={styles.paragraph}>
          Manage files with automatic encryption and decryption. Upload and re-encrypt files securely to AWS.
        </p>
        <ul style={styles.list}>
          <li>Upload files for storage</li>
          <li>Encrypt files automatically upon upload</li>
          <li>Re-encrypt files with new keys as needed</li>
          <li>Monitor file storage usage</li>
        </ul>
      </div>

      {/* Permissions Section */}
      <div 
        style={{ ...styles.section, opacity: showPermissions ? 1 : 0, transitionDelay: '1000ms' }} 
        className="section"
        onMouseEnter={(e) => e.currentTarget.style = { ...styles.section, ...styles.sectionHover }}
        onMouseLeave={(e) => e.currentTarget.style = styles.section}
      >
        <h2 style={styles.sectionHeader}>
          <FaLock style={styles.icon} /> Permission Management
        </h2>
        <p style={styles.paragraph}>
          Set permissions for users to download files. Control access based on roles.
        </p>
        <ul style={styles.list}>
          <li>Grant or revoke download permissions</li>
          <li>Manage user roles and access levels</li>
          <li>Track permission changes</li>
        </ul>
      </div>

      {/* AWS Storage Section */}
      <div 
        style={styles.section}
        onMouseEnter={(e) => e.currentTarget.style = { ...styles.section, ...styles.sectionHover }}
        onMouseLeave={(e) => e.currentTarget.style = styles.section}
      >
        <h2 style={styles.sectionHeader}>
          <FaCloud style={styles.icon} /> AWS Storage
        </h2>
        <p style={styles.paragraph}>
          Utilize AWS for secure and scalable file storage. Benefits include high availability and reliability.
        </p>
        <ul style={styles.list}>
          <li>Global data center access</li>
          <li>Cost-effective storage solutions</li>
          <li>Integration with various AWS services</li>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default AdminHomepage;

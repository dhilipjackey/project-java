import React, { useState, useEffect } from 'react';
import Navbar from '../Pages/Dataownernavbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUpload() {
    const email = sessionStorage.getItem('dataOwnerEmail');
    const [file, setFile] = useState(null);
    const [secretKey, setSecretKey] = useState('');
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/files/filesByEmail?email=${email}`);
            setFiles(response.data);
        } catch (error) {
            toast.error("Error fetching files: " + (error.response?.data || error.message));
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const generateSecretKey = () => {
        return 'key-' + Math.random().toString(36).substr(2, 9);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            toast.error("Please select a file to upload.");
            return;
        }

        const generatedSecretKey = generateSecretKey();
        setSecretKey(generatedSecretKey);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);
        formData.append('secretKey', generatedSecretKey);

        try {
            const response = await axios.post('http://localhost:6900/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data);
            fetchFiles(); // Refresh file list after upload
        } catch (error) {
            toast.error("Error uploading file: " + (error.response?.data || error.message));
        }
    };

    const handleDownload = async (fileName) => {
        try {
            const response = await axios.get(`http://localhost:6900/files/download/${fileName}`, {
                responseType: 'blob' // Important for handling binary data
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Specify file name for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            toast.error("Error downloading file: " + (error.response?.data || error.message));
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`http://localhost:6900/files/delete/${fileId}`);
            toast.success("File deleted successfully.");
            fetchFiles(); // Refresh file list after deletion
        } catch (error) {
            toast.error("Error deleting file: " + (error.response?.data || error.message));
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('dataOwnerEmail');
        window.location.href = '/';
    };

    return (
        <div>
            <Navbar email={email} onLogout={handleLogout} />
        <div style={styles.container}>
            <br/><br/>
            <div style={styles.uploadForm}>
                <h1 style={styles.header}><b>UPLOAD FILES</b></h1>
                <form onSubmit={handleUpload}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        required
                        style={styles.fileInput}
                    />
                    <button type="submit" style={styles.uploadButton}><b>UPLOAD</b></button>
                </form>
                {secretKey && <p style={styles.secretKey}>Generated Secret Key: <strong>{secretKey}</strong></p>}
            </div>
            <br/><br/>
            <h2 style={styles.fileDetailsHeader}><b>FILE DETAILS</b></h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>FILE NAME</th>
                        <th style={styles.tableHeader}>SECRET KEY</th>
                        <th style={styles.tableHeader}>ENCRYPTED STATUS</th>
                        <th style={styles.tableHeader}>RE-ENCRYPTED STATUS</th>
                        <th style={styles.tableHeader}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{file.id}</td>
                            <td style={styles.tableCell}>{file.fileName}</td>
                            <td style={styles.tableCell}>{file.secretKey}</td>
                            <td style={styles.tableCell}>{file.encryptedKeyStore}</td>
                            <td style={styles.tableCell}>{file.reencryptedData}</td>
                            <td style={styles.tableCell}>
                                <div style={styles.actionButtons}>
                                    <button  onClick={() => handleDownload(file.fileName)} style={styles.downloadButton}><b>DOWNLOAD</b></button>
                                    <button onClick={() => handleDelete(file.id)} style={styles.deleteButton}><b>DELETE</b></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ToastContainer />
        </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f7f9fc',
        minHeight: '100vh',
        padding: '20px',
    },
    uploadForm: {
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
    },
    header: {
        color: 'black',
        textShadow: '2px 3px gray',
        fontSize: '25px',
    },
    fileInput: {
        margin: '20px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        cursor: 'pointer',
    },
    uploadButton: {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    secretKey: {
        marginTop: '15px',
        color: '#666',
    },
    fileDetailsHeader: {
        color: 'black',
        textShadow: '2px 3px gray',
        marginTop: '30px',
        fontSize: '22px',
    },
    table: {
        marginTop: '20px',
        width: '100%',
        maxWidth: '1000px',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    tableHeader: {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
    },
    tableRow: {
        textAlign: 'left',
        borderBottom: '1px solid #ccc',
    },
    tableCell: {
        padding: '10px',
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    downloadButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
    },
};

export default FileUpload;

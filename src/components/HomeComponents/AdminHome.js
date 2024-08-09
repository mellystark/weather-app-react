import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Kullanıcıya onay sorusu göster
    const confirmed = window.confirm("Çıkış yapmak istediğinizden emin misiniz?");
    
    if (confirmed) {
      // Token'ı yerel depolamadan kaldır
      localStorage.removeItem('jwtToken');

      // Kullanıcıyı home sayfasına yönlendir
      navigate('/', { replace: true }); // replace true, geri dönüşü engeller
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoutContainer}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
      <h1 style={styles.header}>Admin Page</h1>
      <ul style={styles.linkList}>
        <li style={styles.listItem}>
          <Link to="/weather" style={styles.link}>
            Weather (city)
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/weather-by-city-and-date" style={styles.link}>
            Weather (date)
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/update-weather" style={styles.link}>
            Update Weather (city)
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/delete-weather" style={styles.link}>
            Delete Weather (city)
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/export-weather" style={styles.link}>
            Export Weather to Excel (city)
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  logoutContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  header: {
    fontSize: '36px',
    marginBottom: '20px',
    color: '#333',
  },
  linkList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '600px',
  },
  listItem: {
    margin: '10px 0',
  },
  link: {
    display: 'block',
    padding: '15px',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
  },
};

export default AdminHome;

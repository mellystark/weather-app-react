import React from 'react';
import { Link } from 'react-router-dom';

function UserHome() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Page</h1>
      <ul style={styles.linkList}>
        <li style={styles.listItem}>
          <Link style={styles.link} to="/weather">Weather (city)</Link>
        </li>
        <li style={styles.listItem}>
          <Link style={styles.link} to="/weather-by-city-and-date">Weather (date)</Link>
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
  linkHover: {
    backgroundColor: '#0056b3',
  },
};

export default UserHome;

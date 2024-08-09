import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login');
  };

  const handleUserClick = () => {
    navigate('/user-home');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to basic Forecast App</h1>
      <p style={styles.text}>Are you admin?</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleAdminClick}>true</button>
        <button style={styles.button} onClick={handleUserClick}>false</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#333',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  text: {
    color: '#555',
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Home;

import React, { useState } from 'react';
import axios from 'axios';

function ExportWeather() {
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // API çağrısı ve dosyanın indirilmesi
      const response = await axios.get(`https://localhost:7043/api/Weather/${city}/export`, {
        responseType: 'blob', // Excel dosyasının blob türünde olması gerektiği belirtilir
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // JWT token eklenir
        },
      });

      // Dosya indirme işlemi
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${city}_weather_data.xlsx`); // Dosya adı
      document.body.appendChild(link);
      link.click();
      setMessage(`Weather data for ${city} has been exported successfully.`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error occurred';
      setError(`Error exporting weather data: ${errorMsg}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Export Page</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Export</button>
      </form>
      {loading && <div style={styles.loading}>Loading...</div>}
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#28a745',
  },
  loading: {
    fontSize: "16px",
    color: "#666",
  },
  error: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#dc3545',
  },
};

export default ExportWeather;

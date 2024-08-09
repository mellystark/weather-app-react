import React, { useState } from 'react';
import axios from 'axios';

function DeleteWeather() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const url = `https://localhost:7043/api/Weather/${city}/${district}`;
    console.log(`Attempting to DELETE: ${url}`); // URL'yi kontrol edin

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}` // Token'ı eklediğinizden emin olun
        }
      });

      if (response.status === 204) { // 204 No Content dönmelidir
        setMessage(`Weather data for ${city} and ${district} has been deleted successfully.`);
      } else {
        setMessage('Failed to delete weather data.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error details:', error); // Hata detaylarını konsola yazdırın
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error occurred';
      setError(`Error deleting weather data: ${errorMsg}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Delete Page</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type='text'
          value={city}
          onChange={handleCityChange}
          placeholder='Enter city'
          style={styles.input}
        />
        <input
          type='text'
          value={district}
          onChange={handleDistrictChange}
          placeholder='Enter district'
          style={styles.input}
        />
        <button type='submit' style={styles.button}>Delete</button>
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
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#c82333',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#28a745',
  },
  error: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#dc3545',
  },
  loading: {
    fontSize: "16px",
    color: "#666",
  },
};

export default DeleteWeather;

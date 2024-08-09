import React, { useState } from 'react';
import axios from 'axios';

function UpdateWeather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null); // Ekranda göstermek için veri
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Token'ı alın
  const token = localStorage.getItem('jwtToken');

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Güncellemeyi yap
      const updateResponse = await axios.put(
        `https://localhost:7043/api/Weather/${city}/update`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (updateResponse.status === 200) {
        setMessage('Weather data updated successfully.');
        
        // Güncellenen verileri al
        const fetchResponse = await axios.get(
          `https://localhost:7043/api/Weather/${city}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWeatherData(fetchResponse.data);
        setMessage("");
      } else {
        setError('Failed to update weather data.');
      }
    } catch (error) {
      setError(`Error updating weather data: ${error.response?.data?.message || error.message}`);
      setWeatherData("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Update Page</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Update</button>
      </form>
      {loading && <div style={styles.loading}>Loading...</div>}
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
      {weatherData && (
        <div style={styles.weatherContainer}>
          <h2 style={styles.weatherTitle}>Updated Weather Data</h2>
          <ul style={styles.weatherList}>
            {weatherData.map((weather, index) => (
              <li key={index} style={styles.weatherItem}>
                <p><strong>Date:</strong> {weather.date}</p>
                <p><strong>District:</strong> {weather.district}</p>
                <p><strong>Station Name:</strong> {weather.stationName}</p>
                <p><strong>Temperature:</strong> {weather.temperature} °C</p>
                <p><strong>Humidity:</strong> {weather.humidity}%</p>
                <p><strong>Wind Speed:</strong> {weather.windSpeed} km/h</p>
                <p><strong>Wind Direction:</strong> {weather.windDirection}°</p>
              </li>
            ))}
          </ul>
        </div>
      )}
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
  loading: {
    fontSize: '16px',
    color: '#666',
    marginTop: '5px',
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: 'lightgreen',
  },
  error: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#ff0000',
  },
  weatherContainer: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  weatherTitle: {
    fontSize: '20px',
    marginBottom: '15px',
    color: '#333',
  },
  weatherList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  weatherItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default UpdateWeather;

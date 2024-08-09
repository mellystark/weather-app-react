import React, { useState, useEffect } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedCity(city);
  };

  useEffect(() => {
    if (submittedCity) {
      setLoading(true); // Start loading before making the request
      setError(null); // Clear previous error messages

      fetch(`https://localhost:7043/api/Weather/${submittedCity}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          return response.json();
        })
        .then(data => {
          setWeatherData(data);
          setLoading(false); // Stop loading after data is fetched
        })
        .catch(err => {
          setError(err.message);
          setWeatherData(null); // Clear previous weather data on error
          setLoading(false); // Stop loading on error
        });
    }
  }, [submittedCity]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Weather by City Page</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Get</button>
      </form>

      {loading && <div style={styles.loading}>Loading...</div>}
      {error && <div style={styles.error}>Error fetching weather data: {error}</div>}
      {weatherData && weatherData.length === 0 && (
        <div style={styles.noData}>No weather data available for "{submittedCity}".</div>
      )}
      {weatherData && weatherData.length > 0 && (
        <div style={styles.weatherContainer}>
          <h2 style={styles.weatherTitle}>Weather in {submittedCity}</h2>
          <ul style={styles.weatherList}>
            {weatherData.map((weather, index) => (
              <li key={index} style={styles.weatherItem}>
                <p><strong>Date:</strong> {weather.date}</p>
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
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
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
  error: {
    color: '#ff0000',
    fontSize: '16px',
  },
  loading: {
    fontSize: '16px',
    color: '#666',
  },
  noData: {
    fontSize: '16px',
    color: '#999',
  },
  weatherContainer: {
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
  },
  weatherItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
};

export default Weather;

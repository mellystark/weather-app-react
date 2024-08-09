import React, { useState } from "react";

function WeatherByCityAndDate() {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = () => {
    if (city && startDate && endDate) {
      setLoading(true); // Set loading to true before starting the fetch
      setError(null);

      fetch(
        `https://localhost:7043/api/Weather/${city}/dateRange?startDate=${startDate}&endDate=${endDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setLoading(false); // Set loading to false when fetching completes
        })
        .catch((err) => {
          setWeatherData(null);
          setError(err);
          setLoading(false); // Set loading to false if there's an error
        });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Weather by Date Page</h2>
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Start Date:
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            End Date:
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <button onClick={handleFetchWeather} style={styles.button}>
          Get
        </button>
      </div>
      {loading && <div style={styles.loading}>Loading...</div>}
      {error && <div style={styles.error}>Error fetching weather data</div>}
      {weatherData && weatherData.length === 0 && (
        <div style={styles.noData}>
          No weather data available for "{city}" between these dates.
        </div>
      )}
      {weatherData && weatherData.length > 0 && (
        <div style={styles.weatherContainer}>
          <ul style={styles.weatherList}>
            {weatherData.map((weather, index) => (
              <li key={index} style={styles.weatherItem}>
                <p>
                  <strong>Date:</strong> {weather.date}
                </p>
                <p>
                  <strong>Station Name:</strong> {weather.stationName}
                </p>
                <p>
                  <strong>Temperature:</strong> {weather.temperature} °C
                </p>
                <p>
                  <strong>Humidity:</strong> {weather.humidity}%
                </p>
                <p>
                  <strong>Wind Speed:</strong> {weather.windSpeed} km/h
                </p>
                <p>
                  <strong>Wind Direction:</strong> {weather.windDirection}°
                </p>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "#ff0000",
    fontSize: "16px",
  },
  loading: {
    fontSize: "16px",
    color: "#666",
  },
  noData: {
    fontSize: "16px",
    color: "#999",
  },
  weatherContainer: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  weatherList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  weatherItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
};

export default WeatherByCityAndDate;

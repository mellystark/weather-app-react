import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomeComponents/Home';
import Login from './components/SigningComponents/Login';
import AdminHome from './components/HomeComponents/AdminHome';
import UserHome from './components/HomeComponents/UserHome';
import WeatherByCityAndDate from './components/WeatherComponents/WeatherByCityAndDate';
import UpdateWeather from './components/WeatherComponents/UpdateWeather';
import DeleteWeather from './components/WeatherComponents/DeleteWeather';
import ExportWeather from './components/WeatherComponents/ExportWeather';
import Register from './components/SigningComponents/Register';
import Weather from './components/WeatherComponents/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/weather-by-city-and-date" element={<WeatherByCityAndDate />} />
        <Route path="/update-weather" element={<UpdateWeather />} />
        <Route path="/delete-weather" element={<DeleteWeather />} />
        <Route path="/export-weather" element={<ExportWeather />} />
      </Routes>
    </Router>
  );
}

export default App;

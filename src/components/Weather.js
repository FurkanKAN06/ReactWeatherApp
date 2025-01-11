import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css';

const Weather = ({ setMainClass }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (weatherData) {
      const weatherClass = getWeatherClass(weatherData.weather[0].main);
      setMainClass(weatherClass);
    } else {
      setMainClass('');
    }
  }, [weatherData, setMainClass]);

  const fetchWeatherData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Şehir bulunamadı!');
      } else if (err.request) {
        setError('Ağ hatası!');
      } else {
        setError('API hatası!');
      }
      setWeatherData(null);
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  const addToFavorites = () => {
    if (weatherData && !favorites.some(fav => fav.id === weatherData.id)) {
      const updatedFavorites = [weatherData, ...favorites.slice(0, 2)];
      setFavorites(updatedFavorites);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const getWeatherClass = (main) => {
    switch (main) {
      case 'Clear':
        return 'clear-sky';
      case 'Clouds':
        return 'few-clouds';
      case 'Drizzle':
        return 'drizzle';
      case 'Rain':
        return 'rain';
      case 'Thunderstorm':
        return 'thunderstorm';
      case 'Snow':
        return 'snow';
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return 'mist';
      default:
        return 'default-weather';
    }
  };

  const renderClouds = () => {
    if (!weatherData) return null;

    const main = weatherData.weather[0].main;
    let cloudCount = 0;
    let rainCount = 0;
    let snowCount = 0;

    if (main === 'Clear') {
      return (
        <>
          <div className="sun"></div>
          <div className="sun-rays"></div>
        </>
      );
    }

    if (main === 'Clouds') {
      cloudCount = 6;
    } else if (main === 'Drizzle' || main === 'Rain') {
      cloudCount = 4;
      rainCount = 20;
    } else if (main === 'Thunderstorm') {
      cloudCount = 5;
      rainCount = 30;
    } else if (main === 'Snow') {
      cloudCount = 2;
      snowCount = 15;
    } else if (main === 'Mist') {
      cloudCount = 3;
    }

    const clouds = Array.from({ length: cloudCount }).map((_, index) => (
      <div key={index} className={`cloud cloud_${index % 2 === 0 ? 'one' : 'two'}`} style={{
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 4 + 4}s`
      }} />
    ));

    const rainDrops = Array.from({ length: rainCount }).map((_, index) => (
      <div key={index} className="rain-drop" style={{
        top : `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 0.5 + 0.5}s`
      }} />
    ));

    const snowFlakes = Array.from({ length: snowCount }).map((_, index) => (
      <div key={index} className="snow-flake" style={{
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 3 + 2}s`
      }} />
    ));

    return (
      <>
        {clouds}
        {rainDrops}
        {snowFlakes}
      </>
    );
  };

  return (
    <div className="container mt-5 d-flex flex-lg-row justify-content-between">
      <div className="cloud-container">
        {/* Bulutlar ve diğer efektler burada render edilecek */}
        {renderClouds()}
      </div>

      <div className="card text-dark bg-light mb-3 rounded-3 shadow-lg flex-grow-1 me-3">
        <div className="card-header">
          <h1 className="card-title">Hava Durumu</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              onKeyDown={handleKeyDown}
              placeholder="Şehir adı girin"
              className="form-control rounded-start"
            />
            <button onClick={handleSearch} className="btn btn-primary rounded-end">Ara</button>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {weatherData && (
            <div className={`weather-info weather-container ${getWeatherClass(weatherData.weather[0].main)}`}>
              <h2 className="card-title">{weatherData.name}, {weatherData.sys.country}</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Sıcaklık:</strong> {weatherData.main.temp} °C</li>
                <li className="list-group-item"><strong>Hissedilen Sıcaklık:</strong> {weatherData.main.feels_like} °C</li>
                {/* <li className="list-group-item"><strong>Nem:</strong> {weatherData.main.humidity} %</li> */}
                <li className="list-group-item"><strong>Rüzgar Hızı:</strong> {weatherData.wind.speed} m/s</li>
                <li className="list-group-item"><strong>Hava Durumu:</strong> {weatherData.weather[0].description}</li>
                <li className="list-group-item"><strong>Basınç:</strong> {weatherData.main.pressure} hPa</li>
              </ul>
              <button onClick={addToFavorites} className="btn btn-success mt-3">Favorilere Ekle</button>
            </div>
          )}
        </div>
      </div>

      <div className="favorites-container card bg-light shadow-lg mt-3 mt-lg-0 flex-grow-1">
        <div className="card-header">
          <h2 className="card-title">Favoriler</h2>
        </div>
        <div className="card-body">
          {favorites.length === 0 && <p className="text-muted">Henüz favori yok.</p>}
          {favorites.map(fav => (
            <div key={fav.id} className="favorite-item mb-3 p-3 bg-white rounded shadow-sm">
              <h5>{fav.name}, {fav.sys.country}</h5>
              <p><strong>Sıcaklık:</strong> {fav.main.temp} °C</p>
              <button onClick={() => removeFromFavorites(fav.id)} className="btn btn-danger btn-sm">Sil</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;

import React, { useState, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div className="container mt-5 d-flex justify-content-between">
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
            <div className="weather-info">
              <h2 className="card-title">{weatherData.name}, {weatherData.sys.country}</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Sıcaklık:</strong> {weatherData.main.temp} °C</li>
                <li className="list-group-item"><strong>Hissedilen Sıcaklık:</strong> {weatherData.main.feels_like} °C</li>
                <li className="list-group-item"><strong>Nem:</strong> {weatherData.main.humidity} %</li>
                <li className="list-group-item"><strong>Rüzgar Hızı:</strong> {weatherData.wind.speed} m/s</li>
                <li className="list-group-item"><strong>Hava Durumu:</strong> {weatherData.weather[0].description}</li>
                <li className="list-group-item"><strong>Basınç:</strong> {weatherData.main.pressure} hPa</li>
              </ul>
              <button onClick={addToFavorites} className="btn btn-success mt-3">Favorilere Ekle</button>
            </div>
          )}
        </div>
      </div>

      <div className="favorites-container card bg-light shadow-lg flex-shrink-1">
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

import React from 'react';
import './current-weather.css';

const CurrentWeather = ({ data }) => {
  return (
    <div className="weather-container">
      <div className="header-container">
        <span>
          <p className="city-name">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </span>
        <img
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
          alt="weather"
        />
      </div>
      <div className="bottom-container">
        <p className="weather-temperature">{Math.round(data.main.temp)}°C</p>
        <div className="weather-details">
          <div className="weather-parameter">
            <span className="weather-label details"></span>
          </div>
          <div className="weather-parameter">
            <span className="weather-label">Feels like</span>
            <span className="weather-value">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className="weather-parameter">
            <span className="weather-label">Wind</span>
            <span className="weather-value">{data.wind.speed} m/s</span>
          </div>
          <div className="weather-parameter">
            <span className="weather-label">Humidity</span>
            <span className="weather-value">{data.main.humidity}%</span>
          </div>
          <div className="weather-parameter">
            <span className="weather-label">Pressure</span>
            <span className="weather-value">{data.main.pressure} hpa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

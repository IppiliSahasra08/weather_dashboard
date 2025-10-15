import React from "react";

function WeatherCard({ data }) {
  const { city, temperature, humidity, description, icon } = data;

  // OpenWeatherMap icon URL format
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <img src={iconUrl} alt={description} />
      <p>🌡️ Temperature: {temperature} °C</p>
      <p>💧 Humidity: {humidity} %</p>
      <p>🌥️ Condition: {description}</p>
    </div>
  );
}

export default WeatherCard;

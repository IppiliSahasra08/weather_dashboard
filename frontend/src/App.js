import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setError("");
    setWeather(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/weather/${city}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      // OpenWeatherMap returns 'cod' as status code in the JSON
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message || "Error fetching weather");
      }

      // Extract relevant data from OpenWeatherMap JSON
      const weatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        feels_like : data.main.feels_like,
        sunrise : data.sys.sunrise,
        sunset : data.sys.sunset,
        wind_speed : data.wind.speed,
      };

      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="icon"
          />
          <p>{weather.description}</p>
          <h1>{Math.round(weather.temperature)}°C</h1>
          <p>Feels like: {Math.round(weather.feels_like)}°C</p>

          <div className="details">
            <div>💧 Humidity: {weather.humidity}%</div>
            <div>🌬️ Wind: {weather.wind_speed} m/s</div>
            <div>
               Sunrise:{" "}
              {new Date(weather.sunrise * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div>
               Sunset:{" "}
              {new Date(weather.sunset * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

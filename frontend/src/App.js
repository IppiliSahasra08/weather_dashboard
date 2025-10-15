import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
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
        temperature: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Weather Dashboard</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Get Weather</button>
        </div>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;

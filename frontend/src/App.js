import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
  try {
    setError("");
    setWeather(null);
    console.log("Fetching weather for:", city);

    const response = await fetch(`http://127.0.0.1:8000/weather/${city}`);
    const data = await response.json();
    console.log("Received data:", data);

    if (data.cod && data.cod !== 200) {
      setError(data.message || "Error fetching weather");
      return;
    }

    // Extract relevant info from OpenWeatherMap style response
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    };

    setWeather(weatherData);
  } catch (err) {
    console.error("Fetch error:", err);
    setError("Failed to fetch weather data");
  }
};


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.city}</h2>
          <p>🌡️ Temperature: {weather.temperature} °C</p>
          <p>💧 Humidity: {weather.humidity} %</p>
        </div>
      )}
    </div>
  );
}

export default App;

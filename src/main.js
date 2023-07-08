import React, { useState , useEffect } from "react";

const API_KEY = "fdea2e3e09c37566ee84f3c5efc7645e";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`
    );

    const data = await response.json();

    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, weather, main } = weatherData;

  return (
    <div>
      <h1>Weather in {name}</h1>
      <p>Weather: {weather[0].description}</p>
      <p>Temperature: {main.temp} degrees Celsius</p>
    </div>
  );
};

export default WeatherComponent;

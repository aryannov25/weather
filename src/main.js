import React, { useState, useEffect } from "react";

const API_KEY = "fdea2e3e09c37566ee84f3c5efc7645e";

const WeatherComponent = () => {
  const [city, setCity] = useState("Delhi");

  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    console.log(data);
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container">
      <div className="weather">
        
        {weatherData !== undefined && (
          <div>
          <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />{" "}
          <button onClick={fetchWeatherData}>
            <img
              className=""
              alt="search"
              src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
            />
          </button>
        </div>

        <h1>
          Weather in {weatherData.name} ,{weatherData.sys.country}
        </h1>
        <p>Weather: {weatherData.weather[0].description}</p>
        <p>Temperature: {weatherData.main.temp.toFixed()} °C</p>

          <div className="bottom">
            <div className="feels">
              {weatherData ? (
                <p className="bold">{weatherData.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {weatherData ? <p className="bold">{weatherData.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData ? <p className="bold">{weatherData.wind.speed} KpH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;

import React, { useState, useEffect, useDeferredValue } from "react";
import { BiMap } from "react-icons/bi";
import Feelslike from "./feelslike.png";
import Humidity from "./humidity.png";

const API_KEY = "fdea2e3e09c37566ee84f3c5efc7645e";

const WeatherComponent = () => {
  const [city, setCity] = useState("Delhi");
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const deferredCity = useDeferredValue(city);

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${deferredCity}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      return setError(true);
    }

    const data = await response.json();
    console.log(data);
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [deferredCity]);

  const weatherIconId = weatherData?.weather[0].icon;
  const weatherImageUrl = weatherIconId
    ? `https://openweathermap.org/img/wn/${weatherIconId}@4x.png`
    : undefined;

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
                  alt="Search"
                  src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
                />
              </button>
            </div>
            {weatherImageUrl ? (
              <img className="w-img" src={weatherImageUrl} alt="img"/>
            ) : null}
            <h1>{weatherData.main.temp.toFixed()} °C</h1>
            <p className="desc">{weatherData.weather[0].description}</p>
            <p>
              <BiMap /> {weatherData.name} ,{weatherData.sys.country}
            </p>

            <div className="bottom">
              <div className="feels">
                {weatherData ? (
                  <p className="bold">
                    {weatherData.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>
                  <img className="feelsimg" src={Feelslike} alt="Feels Like"/>
                  Feels Like
                </p>
              </div>
              <div className="humidity">
                {weatherData ? (
                  <p className="bold">{weatherData.main.humidity}%</p>
                ) : null}
                <p>
                  <span>
                    <img className="feelsimg" src={Humidity} alt="Humidity"/>
                  </span>{" "}
                  Humidity
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;

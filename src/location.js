import React, { useState, useEffect } from "react";
import { BiMap } from "react-icons/bi";
import Feelslike from "./img/feelslike.png";
import Humidity from "./img/humidity.png";
import Back from "./img/back.png";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";


//16bfa98849718de13b6e8978b87d47b8
//fdea2e3e09c37566ee84f3c5efc7645e

const WeatherComponent = () => {
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  console.log(lat, lon);

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`+ process.env.REACT_APP_API_KEY+ "&units=metric"
    );

    if (!response.ok) {
      return setError(response.status);
    }
    setError(null);
    const data = await response.json();
    console.log(data);
    setWeatherData(data);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [lat, lon]);

  // https://api.openweathermap.org/data/2.5/weather?lat=28.6542&lon=77.2373&appid=16bfa98849718de13b6e8978b87d47b8

  const weatherIconId = weatherData?.weather[0].icon;
  const weatherImageUrl = weatherIconId
    ? `https://openweathermap.org/img/wn/${weatherIconId}@4x.png`
    : undefined;

  if (error === 404) {
    return (
      <div className="container">
        <div className="weather">
          <h1>Location Not Found!</h1>;
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="container">
        <div className="weather">
          <h2 className="back">
            <span className="backarrow">
              <Link to="/">
                <img className="backarrow" src={Back} alt="Humidity" />{" "}
              </Link>
            </span>{" "}
            Weather App
          </h2>
          <p className="error">Location Not Found!</p>{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="weather">
        {weatherData !== undefined && (
          <div>
            <h2 className="back">
              <span className="backarrow">
                <Link to="/">
                  <img className="backarrow" src={Back} alt="Humidity" />{" "}
                </Link>
              </span>{" "}
              Weather App
            </h2>
            {weatherImageUrl ? (
              <img className="w-img" src={weatherImageUrl} alt="img" />
            ) : null}
            <h1>{weatherData.main.temp.toFixed()} °C</h1>
            <p className="desc">{weatherData.weather[0].description}</p>
            <p>
              <BiMap /> {weatherData.name}, {weatherData.sys.country}
            </p>

            <div className="bottom">
              <div className="feels">
                {weatherData ? (
                  <p className="bold">
                    {weatherData.main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>
                  <img className="feelsimg" src={Feelslike} alt="Feels Like" />
                  Feels Like
                </p>
              </div>
              <div className="humidity">
                {weatherData ? (
                  <p className="bold">{weatherData.main.humidity}%</p>
                ) : null}
                <p>
                  <span>
                    <img className="feelsimg" src={Humidity} alt="Humidity" />
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

import React, { useState, useEffect, useDeferredValue } from "react";
import { BiMap } from "react-icons/bi";
import Feelslike from "./feelslike.png";
import Humidity from "./humidity.png";
// import { useSearchParams } from "react-router-dom";

const API_KEY = "16bfa98849718de13b6e8978b87d47b8";

const WeatherComponent = () => {
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Delhi");

  // const [searchParams] = useSearchParams();

  // const query = searchParams.get("city");
  // console.log(query);
  const deferredCity = useDeferredValue(city);

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
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
  }, [city]);

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
            {weatherImageUrl ? (
              <img className="w-img" src={weatherImageUrl} alt="img" />
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

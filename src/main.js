import React, { useState, useEffect } from "react";
import { BiMap } from "react-icons/bi";
import Feelslike from "./img/feelslike.png";
import Humidity from "./img/humidity.png";
import Back from "./img/back.png";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import clouds from "./img/clouds.gif";
import rain from "./img/rain.gif";
import mist from "./img/mist.gif";
import drizzle from "./img/drizzle.gif";
import clear from "./img/clear1.gif";

//16bfa98849718de13b6e8978b87d47b8
//fdea2e3e09c37566ee84f3c5efc7645e

const Main = () => {
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchParams] = useSearchParams();
  const [imagePath, setImagePath] = useState(null);

  const query = searchParams.get("city");

  const fetchWeatherData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=` +
        process.env.REACT_APP_API_KEY +
        "&units=metric"
    );

    if (!response.ok) {
      return setError(response.status);
    }
    setError(null);
    const data = await response.json();
    // console.log(data);
    setWeatherData(data);

    if (data.weather[0].main === "Clouds") {
      setImagePath(clouds);
    } else if (data.weather[0].main === "Clear") {
      setImagePath(clear);
    } else if (data.weather[0].main === "Rain") {
      setImagePath(rain);
    } else if (data.weather[0].main === "Drizzle") {
      setImagePath(drizzle);
    } else if (data.weather[0].main === "Mist") {
      setImagePath(mist);
    } else {
      setImagePath(clouds);
    }
  };
  useEffect(
    () => {
      fetchWeatherData();
    }, // eslint-disable-next-line
    [query]
  );

  // https://api.openweathermap.org/data/2.5/weather?lat=28.6542&lon=77.2373&appid=16bfa98849718de13b6e8978b87d47b8

  const weatherIconId = weatherData?.weather[0].icon;
  const weatherImageUrl = weatherIconId
    ? `https://openweathermap.org/img/wn/${weatherIconId}@4x.png`
    : undefined;

  if (error === 404) {
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
          <p className="error">City Not Found!</p>{" "}
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="container">
        <div className="weather">
          <div>Loading...</div>{" "}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        borderRadius: "5px",
        opacity: "0.9",
        backgroundImage: `url(${imagePath})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="container"
    >
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
            <div>
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
                    <img
                      className="feelsimg"
                      src={Feelslike}
                      alt="Feels Like"
                    />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;

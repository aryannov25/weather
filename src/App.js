import React, { useState, useEffect } from "react";
import "./App.css";

import { useNavigate } from "react-router-dom";

function App() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    navigate(`/weather?city=${city}`);
  };

  useEffect(() => {
    location();
  }, []);

  const location = async () => {
    const response = await navigator.geolocation.getCurrentPosition((info) => {
      setLon(info.coords.longitude);
      setLat(info.coords.latitude);
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log("submit");
    navigate(`/location?lat=${lat}&lon=${lon}`);
  };

  return (
    <div className="container">
      <div className="weather">
        <h2 className="title">
          Weather App
          <span className="titleline">
            <hr />
          </span>
        </h2>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />{" "}
          {/* <button type="submit">
            <img
              className=""
              alt="search"
              src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
            />
          </button> */}
        </form>
        <div className="or">
          <hr />
          OR
          <hr />
        </div>
        <div>
        {lat == "" && (
            <h4
          >
            Enable Location to see this option
          </h4>
          )}
          
          {!lat == "" && (
            <button
              className="button-21"
              role="button"
              onClick={handleClick}
              disabled={!lat}
            >
              Get Device Location
            </button>
          )}
        </div>
        {/* <Main /> */}
      </div>
    </div>
  );
}

export default App;

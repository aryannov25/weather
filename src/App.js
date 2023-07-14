import React, { useState, useEffect } from "react";
import "./App.css";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(undefined);

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   navigate(`/weather?city=${selectedCity}`);
  // };

  useEffect(() => {
    location();
  }, []);

  const location = () => {
    navigator.geolocation.getCurrentPosition(
      (info) => {
        setLon(info.coords.longitude);
        setLat(info.coords.latitude);
        setLocationEnabled(true);
      },
      (err) => {
        setLocationEnabled(false);
        console.log(err);
      }
    );
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  
  console.log(selectedCity);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/weather?city=${selectedCity}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/location?lat=${lat}&lon=${lon}`);
  };

  return (
    <div className="container">
      <div className="weatherInput">
        <h2 className="title">Weather App</h2>
        <div className="or">
          <div className="or__line"></div>
          <div className="or__text"></div>
        </div>

        <form className="search" onChange={handleSubmit}>
          {/* <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          /> */}

          <label for="City">Select a City</label>
          <select
            name="cities"
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
          </select>

          {/* <button className="searchbtn" type="submit" disabled={!city}>
            <img
              alt="search"
              src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
            />
          </button> */}
        </form>
        <div className="or">
          <div className="or__line"></div>
          <div className="or__text">OR</div>
        </div>
        <div>
          <button
            className="button-21"
            onClick={handleClick}
            disabled={!locationEnabled}
          >
            <span>
              <FaLocationArrow />
            </span>
            {""}&nbsp; Get Current Location
          </button>

          {locationEnabled === false && (
            <h4>Enable Location to use this option</h4>
          )}
        </div>
        {/* <Main /> */}
      </div>
    </div>
  );
}

export default App;

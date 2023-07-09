import React, { useState, useEffect } from "react";
import "./App.css";

import { useNavigate } from "react-router-dom";

function App() {
  const [city, setCity] = useState("Delhi");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    navigate(`/weather?city=${city}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      console.log(data);
    });
  });

  return (
    <div className="container">
      <div className="weather">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />{" "}
          <button type="submit">
            <img
              className=""
              alt="search"
              src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
            />
          </button>
        </form>
        {/* <Main /> */}
      </div>
    </div>
  );
}

export default App;

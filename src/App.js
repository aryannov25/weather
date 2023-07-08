import React, { useState } from "react";
import "./App.css";
import Main from "./main";
import { Link } from "react-router-dom";


function App() {
  const [city, setCity] = useState("Delhi");

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />{" "}
          <Link to="/weather">
          <button>
            <img
              className=""
              alt="search"
              alt="Search"
              src="https://cdn-icons-png.flaticon.com/512/3917/3917132.png"
            />
          </button>
          </Link>
        </div>
        {/* <Main /> */}
      </div>
    </div>
  );
}

export default App;

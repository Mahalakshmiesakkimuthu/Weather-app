import "./App.css";

import { useState, useEffect } from "react";

import {
  FaMoon,
  FaBell,
  FaUser,
  FaSearch,
  FaCalendar,
  FaLocationArrow,
  FaWind,
} from "react-icons/fa";

import {
  FaHouse,
  FaSun,
} from "react-icons/fa6";

import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiHumidity,
  WiRain,
  WiNightClear,
} from "react-icons/wi";

import Forecast from "./pages/Forecast";
import Map from "./pages/Map";
import AirQuality from "./pages/AirQuality";



function App() {

  const [page, setPage] = useState("dashboard");
  const [city, setCity] = useState("Tiruchirappalli");
  const [searchCity, setSearchCity] = useState("");
  const [forecast, setForecast] = useState(null);

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={50} color="#facc15" />;

      case "Clouds":
        return <WiCloudy size={50} color="#60a5fa" />;

      case "Rain":
      case "Drizzle":
        return <WiRain size={50} color="#60a5fa" />;

      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog size={50} color="#60a5fa" />;

      default:
        return <WiDayCloudy size={50} color="#60a5fa" />;
    }
  };

  const getWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      setWeather(data);
      setCity(data.name);
      console.log("NEW CITY:", data.name);
      getForecast(cityName);

    } catch (err) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const getForecast = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Forecast not found");
      }

      const data = await response.json();

      setForecast(data);
    } catch (err) {
      console.log("Forecast error:", err);
    }
  };
  useEffect(() => {
    getWeather("Tiruchirappalli");
  }, []);

  return (
    <>
      <div className="container">
        <div className="side1">

          <aside>

            <div className="logo">
              <WiCloudy size={40} color="#60a5fa" />
              <h1>SkyScope</h1>
            </div>

            <div className="nav">

              <ul>

                <li onClick={() => setPage("dashboard")}>
                  <FaHouse />
                  Dashboard
                </li>

                <li onClick={() => setPage("forecast")}>
                  <FaCalendar />
                  Forecast
                </li>

                <li onClick={() => setPage("map")}>
                  <FaLocationArrow />
                  Map
                </li>

                <li onClick={() => setPage("air")}>
                  <FaWind />
                  Air Quality
                </li>

                

              </ul>

            </div>

          </aside>

        </div>

        <div className="side2">

          <header>

            <nav className="header">

              <div className="search-box">

                <FaSearch
                  className="search-icon"
                  onClick={() => {
                    if (searchCity.trim()) {
                      getWeather(searchCity);
                      setSearchCity("");
                    }
                  }}
                />

                <input
                  type="text"
                  placeholder="Search city..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchCity.trim()) {
                      getWeather(searchCity);
                      setSearchCity("");
                    }
                  }}
                />
                {error && (
                  <p className="error-message">
                    {error}
                  </p>
                )}

              </div>


            </nav>

          </header>


          {page === "dashboard" && (

            <>
              <section className="weather-card">

                <div className="left">

                  <h1>
                    <WiDayCloudy />
                    {loading
                      ? "Loading..."
                      : `${Math.round(weather?.main?.temp ?? 0)}°C`}
                  </h1>

                  <h3>
                    {city}, {weather?.sys?.country}
                  </h3>

                  <h3>
                    {weather?.weather?.[0]?.description || "Loading..."}
                  </h3>

                  <p>
                    Wednesday, 05 Aug 2026 • 10:30 AM
                  </p>

                </div>


                <div className="right">

                  <div className="right-card">
                    <h2>Feels Like</h2>
                    <p>
                      {weather?.main?.feels_like
                        ? `${Math.round(weather.main.feels_like)}°C`
                        : "--"}
                    </p>
                  </div>

                  <div className="right-card">
                    <h2>Sunrise</h2>
                    <p>
                      {weather?.sys?.sunrise
                        ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "--"}
                    </p>
                  </div>

                  <div className="right-card">
                    <h2>Sunset</h2>
                    <p>
                      {weather?.sys?.sunset
                        ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                        : "--"}
                    </p>
                  </div>

                  <div className="right-card">
                    <h2>UV Index</h2>
                    <p>6 (High)</p>
                  </div>

                </div>

              </section>

              <section>

                <div className="weather-highlights">

                  <div className="cards">

                    <WiHumidity
                      size={40}
                      color="#60a5fa"
                    />

                    <div>
                      <p>Humidity</p>
                      <h3>
                        {weather?.main?.humidity ?? "--"}%
                      </h3>
                    </div>

                  </div>


                  <div className="cards">

                    <FaWind
                      size={40}
                      color="#60a5fa"
                    />

                    <div>
                      <p>Wind</p>
                      <h3>
                        {weather?.wind?.speed
                          ? `${Math.round(weather.wind.speed * 3.6)} km/h`
                          : "--"}
                      </h3>
                    </div>

                  </div>


                  <div className="cards">

                    <FaSun
                      size={40}
                      color="#facc15"
                    />

                    <div>
                      <p>Feels Like</p>
                      <p>
                        {weather?.main?.feels_like
                          ? `${Math.round(weather.main.feels_like)}°C`
                          : "--"}
                      </p>
                    </div>

                  </div>


                  <div className="cards">

                    <WiFog
                      size={40}
                      color="#60a5fa"
                    />

                    <div>
                      <p>Visibility</p>
                      <h3>
                        {weather?.visibility
                          ? `${(weather.visibility / 1000).toFixed(1)} km`
                          : "--"}
                      </h3>
                    </div>

                  </div>

                </div>

              </section>

              <section>

                <h2 className="hour">
                  Hourly Forecast
                </h2>


                <div className="hourly-forecast">

                  {forecast?.list?.slice(0, 8).map((item) => (
                    <div className="card1" key={item.dt}>
                      <p>
                        {new Date(item.dt * 1000).toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>

                      {getWeatherIcon(item.weather[0].main)}

                      <h3>
                        {Math.round(item.main.temp)}°C
                      </h3>
                    </div>
                  ))}

                </div>

              </section>

            </>

          )}


         {page === "forecast" && (
  <Forecast city={city} />
)}


          {page === "map" && (
            <Map city={city} />
          )}


          {page === "air" && (
            <AirQuality city={city} />
          )}


        </div>

      </div>
    </>
  );
}

export default App;
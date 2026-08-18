import "../App.css";
import { useEffect, useState } from "react";

import {
  FaLeaf,
  FaWind,
  FaExclamationTriangle,
} from "react-icons/fa";

function AirQuality({ city }) {
  console.log("AIR QUALITY CITY:", city);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getAQIStatus = (aqi) => {
    switch (aqi) {
      case 1:
        return "Good";
      case 2:
        return "Fair";
      case 3:
        return "Moderate";
      case 4:
        return "Poor";
      case 5:
        return "Very Poor";
      default:
        return "--";
    }
  };

  const getAirQuality = async () => {
    try {
      setLoading(true);
      setError("");

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error("Location not found");
      }

      const weatherData = await weatherResponse.json();

      const { lat, lon } = weatherData.coord;

      const airResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (!airResponse.ok) {
        throw new Error("Air quality data not found");
      }

      const data = await airResponse.json();

      setAirData(data.list[0]);

    } catch (err) {
      console.log(err);
      setError("Unable to load air quality data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (city) {
      getAirQuality();
    }
  }, [city]);

  return (
    <div className="air-quality-page">
      <h5>Current City: {city}</h5>

      {/* Page Header */}

      <div className="air-header">

        <div>
          <h1>Air Quality</h1>
          <p>
            Air pollution information for {city}
          </p>          </div>

        <div className="air-location">
          📍 {city}
        </div>

      </div>

      {/* AQI Main Card */}

      <section className="aqi-card">

        <div className="aqi-score">

          <p>Air Quality Index</p>

          <h1>
            {loading ? "..." : airData?.main?.aqi ?? "--"}
          </h1>

          <h5>
            {airData?.main?.aqi === 1
              ? "Good"
              : airData?.main?.aqi === 2
                ? "Fair"
                : airData?.main?.aqi === 3
                  ? "Moderate"
                  : airData?.main?.aqi === 4
                    ? "Poor"
                    : airData?.main?.aqi === 5
                      ? "Very Poor"
                      : "--"}
          </h5>

          <p>
            {airData?.main?.aqi === 1 &&
              "Air quality is good and suitable for normal outdoor activities."}

            {airData?.main?.aqi === 2 &&
              "Air quality is fair. Most people can continue normal activities."}

            {airData?.main?.aqi === 3 &&
              "Air quality is moderate. Sensitive people should take some precautions."}

            {airData?.main?.aqi === 4 &&
              "Air quality is poor. Consider reducing prolonged outdoor activities."}

            {airData?.main?.aqi === 5 &&
              "Air quality is very poor. Avoid prolonged outdoor exposure when possible."}
          </p>

        </div>


        <div className="aqi-scale">

          <div className="scale-item">
            <span>0</span>
            <p>Good</p>
          </div>

          <div className="scale-item">
            <span>50</span>
            <p>Good</p>
          </div>

          <div className="scale-item">
            <span>100</span>
            <p>Moderate</p>
          </div>

          <div className="scale-item">
            <span>150</span>
            <p>Unhealthy</p>
          </div>

          <div className="scale-item">
            <span>200</span>
            <p>Very Unhealthy</p>
          </div>

        </div>

      </section>


      {/* Pollutants */}

      <h2 className="air-title">
        Pollutants
      </h2>


      <div className="pollutant-grid">

        {/* PM2.5 */}

        <div className="pollutant-card">

          <div className="pollutant-top">

            <FaWind
              size={30}
              color="#60a5fa"
            />

            <span>PM2.5</span>

          </div>

          <h2>
            {airData?.components?.pm2_5 ?? "--"} µg/m³
          </h2>



          <p>Moderate</p>

          <div className="pollution-bar">
            <div className="pollution-progress"></div>
          </div>

        </div>


        {/* PM10 */}

        <div className="pollutant-card">

          <div className="pollutant-top">

            <FaWind
              size={30}
              color="#60a5fa"
            />

            <span>PM10</span>

          </div>

          <h2>
            {airData?.components?.pm10 ?? "--"} µg/m³
          </h2>

          <p>Moderate</p>

          <div className="pollution-bar">
            <div className="pollution-progress"></div>
          </div>

        </div>


        {/* CO */}

        <div className="pollutant-card">

          <div className="pollutant-top">

            <FaLeaf
              size={30}
              color="#60a5fa"
            />

            <span>CO</span>

          </div>

          <h2>
            {airData?.components?.co ?? "--"} µg/m³
          </h2>

          <p>Good</p>

          <div className="pollution-bar">
            <div className="pollution-progress"></div>
          </div>

        </div>


        {/* NO2 */}

        <div className="pollutant-card">

          <div className="pollutant-top">

            <FaLeaf
              size={30}
              color="#60a5fa"
            />

            <span>NO₂</span>

          </div>

          <h2>
            {airData?.components?.no2 ?? "--"} µg/m³
          </h2>

          <p>Good</p>

          <div className="pollution-bar">
            <div className="pollution-progress"></div>
          </div>

        </div>


        {/* O3 */}

        <div className="pollutant-card">

          <div className="pollutant-top">

            <FaLeaf
              size={30}
              color="#60a5fa"
            />

            <span>O₃</span>

          </div>

          <h2>
            {airData?.components?.o3 ?? "--"} µg/m³
          </h2>

          <p>Moderate</p>

          <div className="pollution-bar">
            <div className="pollution-progress"></div>
          </div>

        </div>


        {/* SO2 */}

        <div className="pollutant-card">

          <div className="pollutant-top">

            <FaLeaf
              size={30}
              color="#60a5fa"
            />

            <span>SO₂</span>

          </div>

          <h2>
            {airData?.components?.so2 ?? "--"} µg/m³
          </h2>

          <p>Good</p>

          <div className="pollution-bar">
            <div className="pollution-progress"></div>
          </div>

        </div>

      </div>


      {/* Health Recommendation */}

      <section className="health-card">

        <FaExclamationTriangle
          size={35}
          color="#facc15"
        />

        <div>

          <h2>Health Recommendation</h2>

          <p>
            Air quality is moderate today. Most people can
            continue normal outdoor activities. Sensitive
            individuals may consider reducing prolonged
            outdoor activity.
          </p>

        </div>

      </section>


      {/* Air Quality Tips */}

      <section>

        <h2 className="air-title">
          Air Quality Tips
        </h2>

        <div className="air-tips">

          <div className="tip-card">
            <FaLeaf size={30} color="#60a5fa" />
            <h3>Stay Hydrated</h3>
            <p>
              Drink enough water throughout the day.
            </p>
          </div>

          <div className="tip-card">
            <FaWind size={30} color="#60a5fa" />
            <h3>Check AQI</h3>
            <p>
              Check air quality before outdoor activities.
            </p>
          </div>

          <div className="tip-card">
            <FaExclamationTriangle
              size={30}
              color="#facc15"
            />
            <h3>Reduce Exposure</h3>
            <p>
              Sensitive people should avoid prolonged
              outdoor exposure when AQI increases.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default AirQuality;
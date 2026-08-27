import "../App.css";
import { useEffect, useState } from "react";

import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiRain,
} from "react-icons/wi";

function Forecast({city}) {
  console.log("FORECAST CITY:", city);
  const [forecast, setForecast] = useState([]);
const API_KEY = import.meta.env.SkyScope;
const getForecast = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    console.log("FORECAST CITY:", city);
console.log("FORECAST DATA:", data);

    const daily = data.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    setForecast(daily);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  if (city) {
    getForecast();
  }
}, [city]);
  return (
    <div className="forecast-page">
      <div className="forecast-heading">
        <div>
          <h1>7-Day Forecast</h1>
          <p>{city},India</p>
          <p>Total Forecast: {forecast.length}</p>
        </div>
      </div>

      <div className="forecast-cards">
        {forecast.map((day, index) => (
  <div className="forecast-card" key={index}>

    <h3>
      {new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
      })}
    </h3>

    <p>
      {new Date(day.dt_txt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      })}
    </p>

    <WiDaySunny
      size={55}
      color="#facc15"
    />

    <h4>
      {day.weather[0].main}
    </h4>

    <h2>
      {Math.round(day.main.temp)}°C
    </h2>

    <p>
      {Math.round(day.main.temp_min)}°C /{" "}
      {Math.round(day.main.temp_max)}°C
    </p>

  </div>
))}

        

      </div>
      <div className="forecast-info">

        <div className="info-box">
          <h3>Highest Temperature</h3>
          <h2>34°C</h2>
          <p>Thursday</p>
        </div>

        <div className="info-box">
          <h3>Lowest Temperature</h3>
          <h2>22°C</h2>
          <p>Tuesday</p>
        </div>

        <div className="info-box">
          <h3>Rain Probability</h3>
          <h2>35%</h2>
          <p>Friday</p>
        </div>

      </div>

    </div>
  );
}

export default Forecast;
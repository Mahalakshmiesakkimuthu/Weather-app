import "../App.css";

import { useState } from "react";


import {
  FaCog,
  FaBell,
  FaLocationArrow,
  FaTemperatureHigh,
  FaGlobe,
  FaMoon,
} from "react-icons/fa";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`settings-page ${darkMode ? "dark-mode" : ""}`}>

      {/* Page Header */}

      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>Customize your SkyScope experience</p>
        </div>
      </div>


      {/* General Settings */}

      <section className="settings-section">

        <h2>General</h2>

        <div className="settings-card">

          <div className="setting-item">

            <div className="setting-icon">
              <FaTemperatureHigh />
            </div>

            <div className="setting-content">
              <h3>Temperature Unit</h3>
              <p>Choose how temperature is displayed</p>
            </div>

            <select>
              <option>°C - Celsius</option>
              <option>°F - Fahrenheit</option>
            </select>

          </div>


          <div className="setting-item">

            <div className="setting-icon">
              <FaGlobe />
            </div>

            <div className="setting-content">
              <h3>Language</h3>
              <p>Select your preferred language</p>
            </div>

            <select>
              <option>English</option>
              <option>Tamil</option>
            </select>

          </div>


          <div className="setting-item">

            <div className="setting-icon">
              <FaLocationArrow />
            </div>

            <div className="setting-content">
              <h3>Default Location</h3>
              <p>Set your default weather location</p>
            </div>

            <span className="setting-value">
              Tiruchirappalli
            </span>

          </div>

        </div>

      </section>


      {/* Notifications */}

      <section className="settings-section">

        <h2>Notifications</h2>

        <div className="settings-card">

          <div className="setting-item">

            <div className="setting-icon">
              <FaBell />
            </div>

            <div className="setting-content">
              <h3>Weather Alerts</h3>
              <p>Receive important weather notifications</p>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>

          </div>


          <div className="setting-item">

            <div className="setting-icon">
              <FaBell />
            </div>

            <div className="setting-content">
              <h3>Daily Forecast</h3>
              <p>Get daily weather forecast updates</p>
            </div>

            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>

          </div>


          <div className="setting-item">

            <div className="setting-icon">
              <FaBell />
            </div>

            <div className="setting-content">
              <h3>Air Quality Alerts</h3>
              <p>Receive notifications when AQI is high</p>
            </div>

            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>

          </div>

        </div>

      </section>


      {/* Appearance */}

      <section className="settings-section">

        <h2>Appearance</h2>

        <div className="settings-card">

          <div className="setting-item">

            <div className="setting-icon">
              <FaMoon />
            </div>

            <div className="setting-content">
              <h3>Dark Mode</h3>
              <p>Change the appearance of the application</p>
            </div>

            <label className="switch">
  <input
    type="checkbox"
    checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
  />
  <span className="slider"></span>
</label>

          </div>

        </div>

      </section>


      {/* Account */}

      <section className="settings-section">

        <h2>Application</h2>

        <div className="settings-card">

          <div className="setting-item">

            <div className="setting-icon">
              <FaCog />
            </div>

            <div className="setting-content">
              <h3>About SkyScope</h3>
              <p>Weather dashboard application</p>
            </div>

            <span className="setting-value">
              v1.0.0
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Settings;
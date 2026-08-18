import "../App.css";

function Map({ city }) {
  return (
    <div className="map-page">

      <div className="map-heading">
        <div>
          <h1>Weather Map</h1>
          <p>View weather conditions on the map</p>
        </div>

        <div className="map-location">
          📍{city}, India
        </div>
      </div>

      <div className="map-card">
        <iframe
          title={`${city} Map`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(city)}&output=embed`}
          className="map-frame"
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
}

export default Map;
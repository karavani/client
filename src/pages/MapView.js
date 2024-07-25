import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addReview } from "../actions"; // Import your action to add reviews
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/leaflet/marker-icon.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});
// Custom icon for wind direction
const windIcon = L.divIcon({
  className: "wind-icon",
  html: `<div class="arrow" style="transform: rotate(45deg);"></div>`,
  iconSize: [24, 24],
});


// Fixed fetch length for simplicity
const FETCH_LENGTH = 50000 // 50 km

const MapView = () => {
  const spots = useSelector((state) => state.spots.spots);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    spots.forEach((spot) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${spot.lat}&lon=${spot.lon}&appid=0a145abc27717a344615bbbeccfdad8c`
        )
        .then((response) => {
          const windSpeed = response.data.wind.speed; // m/s
          const windDir = response.data.wind.deg; // degrees

          // Calculate wave height using SMB formula
          const waveHeight = 0.21 * (windSpeed * windSpeed) / Math.pow(FETCH_LENGTH, 1 / 3);
          
          setWeatherData((prevData) => ({
            ...prevData,
            [spot._id]: {
              ...response.data,
              waveHeight: waveHeight,
            },
          }));
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    });
  }, [spots]);

  return (
    <MapContainer
      center={[32.0853, 34.7818]}
      zoom={8}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {spots.map((spot) => (
        <Marker key={spot._id} position={[spot.lat, spot.lon]}>
          <Popup>
            <div>
              <h3>{spot.name}</h3>
              {weatherData[spot._id] ? (
                <div>
                  <p>
                    Temperature:{" "}
                    {Math.round(weatherData[spot._id].main.temp - 273.15)}°C
                  </p>
                  <p>
                    Condition: {weatherData[spot._id].weather[0].description}
                  </p>
                  <p>
                    Wind Speed: {weatherData[spot._id].wind.speed} m/s
                  </p>
                  <p>
                    Wind Direction: {weatherData[spot._id].wind.deg}°
                  </p>
                  <p>
                    Wave Height: {weatherData[spot._id].waveHeight} m
                  </p>
                  <div className="wind-arrow" style={{ transform: `rotate(${weatherData[spot._id].wind.deg}deg)` }}></div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
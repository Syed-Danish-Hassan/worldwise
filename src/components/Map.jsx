/* eslint-disable no-unused-vars */
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
function Map() {
  const { cities } = useCities();
  const navigate = useNavigate();

  // const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  console.log(mapLat, mapLng);
  //const lat = searchParams.get("lat");
  //const lng = searchParams.get("lng");
  //console.log(mapLat, mapLng);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            //position={[mapLat, mapLng]}
            key={city.id}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}{" "}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 27 })}>
        {" "}
        Change
      </button> */}
    </div>
  );
}

export default Map;

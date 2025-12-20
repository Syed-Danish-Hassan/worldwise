/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { map } from "leaflet";
import { useURLPosition } from "../hooks/useURLPosition";

function Map() {
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLoactionPosition,
    getPosition,
  } = useGeolocation();
  const navigate = useNavigate();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [mapLat, mapLng] = useURLPosition();
  //const mapLat = searchParams.get("lat");
  // const mapLng = searchParams.get("lng");
  //console.log("maplat and maplng ", mapLat, mapLng);

  //const lat = searchParams.get("lat");
  //const lng = searchParams.get("lng");
  //console.log(lat, lng);
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLoactionPosition) {
      setMapPosition([geoLoactionPosition.lat, geoLoactionPosition.lng]);
    }
  }, [geoLoactionPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLoactionPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        //center={[40, 0]}
        center={mapPosition}
        //center={mapLat === null || mapLng === null ? [40, 0] : [mapLat, mapLng]}
        //center={[mapLat, mapLng]}
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  //console.log("ChangeCenter ", position);
  const [lati, lngi] = position;
  //console.log("lati longi to: ", lati, lngi);
  const map = useMap();
  if (lati !== null && lngi !== null) {
    //console.log("Changing center to: ", lati, lngi);
    map.setView([lati, lngi]);
  }

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      //console.log("Map clicked at ", e.latlng);
    },
  });
}

export default Map;

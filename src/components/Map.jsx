/* eslint-disable no-unused-vars */
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // console.log(lat, lng);
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}{" "}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 27 })}>
        {" "}
        Change
      </button>
    </div>
  );
}

export default Map;

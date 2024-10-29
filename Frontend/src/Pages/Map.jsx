import "../assets/css/formStyles.css";
import "../assets/css/loginStyle.css";
import { useCallback, useRef, useState, useEffect } from "react";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";

import "jspdf-autotable";
import MapView from "../components/Header/mapView";

const Map = () => {
  return (
    <div className="container mt-5">
      <h1>Mapa con OpenStreetMap y Leaflet en React</h1>
      <MapView />
    </div>
  );
};
export default Map;

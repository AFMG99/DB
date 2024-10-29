import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importar las imágenes de los íconos directamente
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { useLocation } from 'react-router-dom';

// Crear un nuevo ícono de marcador
const customIcon = new L.Icon({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto del ícono que se ancla en la posición
  popupAnchor: [1, -34], // Posición de la ventana emergente
  shadowSize: [41, 41] // Tamaño de la sombra
});

const MapView = () => {
  const location = useLocation();
  const position = location.state?.position ||[6.279885, -75.583227];

  return (
    <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          Tecnologico de Antioquia
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;

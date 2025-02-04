// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// // Fix for marker icons
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// const DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerIconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// interface Location {
//   lat: number;
//   lng: number;
// }

// interface MapPickerProps {
//   onLocationSelect: (location: Location) => void;
// }

// const MapPicker: React.FC<MapPickerProps> = ({ onLocationSelect }) => {
//   const [markerPosition, setMarkerPosition] = useState<[number, number]>([51.505, -0.09]); // Default center (London)

//   const handleMapClick = (e: L.LeafletMouseEvent) => {
//     const { lat, lng } = e.latlng;
//     setMarkerPosition([lat, lng]);
//     onLocationSelect({ lat, lng }); // Pass selected location to parent
//   };

//   return (
//     <MapContainer
//       center={markerPosition}
//       zoom={13}
//       style={{ height: '200px', width: '200px' }}
//       onClick={handleMapClick}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={markerPosition}>
//         <Popup>Selected Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapPicker;
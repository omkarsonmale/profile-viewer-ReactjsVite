
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";

const MapComponent = ({ onSelectLocation, initialLocation, markerLocation }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) {
      if (!document.getElementById("map")._leaflet_id) { 
      if(initialLocation && markerLocation ){
        const leafletMap = L.map("map").setView(initialLocation, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);
        L.marker(markerLocation).addTo(leafletMap);
        setMap(leafletMap);
      }else{
        const leafletMap = L.map("map").setView([51.505, -0.09], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);
        setMap(leafletMap);
      }
    }
    }

    return () => {
      if (map) {
        map.off();
        map.remove();
        setMap(null); 
      }
    };
  }, []); 

  const handleMapClick = useCallback(
    (e) => {
      onSelectLocation(e.latlng); 
      console.log("location " ,e.latlng);
    },
    [onSelectLocation]
  );

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map, handleMapClick]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};



export default MapComponent;

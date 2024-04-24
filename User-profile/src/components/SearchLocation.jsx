import { useState } from "react";
import MapComponent from "../components/MapComponent.jsx";
import "./SearchLocation.css";

const SearchLocation = () => {
  const [searchName, setSearchName] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  function getUsers() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
        const userData = JSON.parse(localStorage.getItem(key));
       
        if (userData.name === searchName) {
          users.push(userData); 
        }
      
    }

    console.log(users);
    return users;
  }
  

  const handleSearch = () => {
   
    const user = getUsers(searchName);
    console.log(user);
    setUserLocation({ lat: user[0]?.location?.lat, lng: user[0]?.location?.lng });
    console.log(userLocation);
  };

  return (
    <div className="search-location-container">
      <h2>Search User Location</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter user's name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="map-container">
        {userLocation && (
          <MapComponent
            initialLocation={[userLocation.lat, userLocation.lng]}
            markerLocation={[userLocation.lat, userLocation.lng]}
          />
        )}
      </div>
    </div>
  );
};

export default SearchLocation;

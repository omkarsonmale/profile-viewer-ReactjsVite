import PropTypes from "prop-types";
import { useState } from "react";
import MapComponent from "./MapComponent.jsx";
import "./UserForm.css";

const UserForm = ({ onUserAdd }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !description || !location) {
      alert("Please fill in all fields and select a location");
      return;
    }
    const userData = {
      id: Date.now(),
      name,
      photo,
      description,
      location,
    };
    localStorage.setItem(`user-${userData.id}`, JSON.stringify(userData));
    onUserAdd(userData);
    setName("");
    setPhoto("");
    setDescription("");
    setLocation(null);
  };

  return (
    <div className="user-form-container">
      <h2 className="form-heading">Create User</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="user-form-input"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="user-form-input"
        />
        {photo && (
          <img
            src={photo}
            alt="User"
            className="user-form-photo"
          />
        )}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="user-form-input"
        />
        <p className="map-heading">To set the location, click on the location.</p>
        <MapComponent onSelectLocation={handleLocationSelect} className="map-component" />
        <button type="submit" className="user-form-button" style={{margin:'5px'}}>Add User</button>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  onUserAdd: PropTypes.func.isRequired,
};

export default UserForm;

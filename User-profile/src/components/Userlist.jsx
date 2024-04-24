import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserList.css";

const UserList = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Link to="/search-location">
          <button className="search-button">Search Location</button>
        </Link>
      </div>
      <div className="user-card-container">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            {user.photo && (
              <img src={user.photo} alt={user.name} className="user-card-image" />
            )}
            <div className="user-card-info">
              <h3>{user.name}</h3>
              <p>{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
      description: PropTypes.string.isRequired,
      location: PropTypes.object,
    })
  ).isRequired,
};

export default UserList;

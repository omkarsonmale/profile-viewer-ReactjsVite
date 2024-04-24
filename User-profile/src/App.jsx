import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SearchLocation from "../src/components/SearchLocation";
import UserForm from "../src/components/UserForm.jsx";
import UserList from "../src/components/Userlist.jsx";

const App = () => {
  const [users, setUsers] = useState([]);

  const handleAddUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
    };
    setUsers([...users, newUser]);
  };

  return (
    <Router>
      <div>
        <h1>User Information</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UserForm onUserAdd={handleAddUser} />
                <UserList users={users} />
              </>
            }
          />
          <Route path="/search-location" element={<SearchLocation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

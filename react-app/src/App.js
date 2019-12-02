import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(response => {
        console.log("GET response", response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log("Error on GET", error);
      })
  }, [change]);

  const deleteUser = id => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(response => {
        console.log("DELETE response", response);
        setChange(!change);
      })
      .catch(error => {
        console.log("Error on DELETE", error);
      })
  };

  return (
    <div className="App">
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <h3>{user.bio}</h3>
            <div className="delete" onClick={() => deleteUser(user.id)}>
              ✖
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

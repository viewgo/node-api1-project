import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", bio: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(response => {
        console.log("GET response", response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log("Error on GET", error);
      });
  }, [change]);

const addUser = () => {
  axios
  .post("http://localhost:8000/api/users", newUser)
  .then(response => {
    console.log("POST response", response);
    setNewUser({ name: "", bio: "" });
    setChange(!change);

  })
  .catch(error => {
    console.log("Error on POST", error);
  });

}

  const deleteUser = id => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(response => {
        console.log("DELETE response", response);
        setChange(!change);
      })
      .catch(error => {
        console.log("Error on DELETE", error);
      });
  };

  const handleChange = e => {
    console.log(e.target.name, e.target.value);

    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="App">

      <form onSubmit={addUser} autoComplete="off">
        <div className="form-input">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Name"
            autoComplete="off"
          />
        </div>

        <div className="bio-input">
          <textarea
            type="text"
            name="bio"
            value={newUser.bio}
            onChange={handleChange}
            placeholder="Bio"
            autoComplete="off"
          />
        </div>
        <button type="submit">Add User</button>
      </form>

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

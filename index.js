// implement your API here
const express = require("express");
const cors = require("cors");
const server = express();
const port = 8000;

const data = require("./data/db.js");


server.use(express.json());
server.use(cors());




server.get("/", (req, res) => {
  res.send("Hello World");
});

//GET USERS
server.get("/api/users", (req, res) => {
  data
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error on GET /users", err);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

//GET USER BY ID
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  data
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(`error on GET /users/${id}`, err);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//POST USER
server.post("/api/users", (req, res) => {
  const body = req.body;

  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    data
      .insert(body)
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        console.log("error on POST /users", err);
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
});

//DELETE USER BY ID
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  data
    .remove(id)
    .then(count => {
      if (count === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "User removed successfully" });
      }
    })
    .catch(err => {
      console.log("error on DELETE /users/:id", err);
      res.status(500).json({ error: "The user could not be removed" });
    });
});

//PUT USER BY ID
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    data
      .update(id, body)
      .then(user => {
        if (user) {
          res.status(200).json({ message: "User updated successfully" });
        } else {
          res
            .status(404)
            .json({
              message: "The user with the specified ID does not exist."
            });
        }
      })
      .catch(err => {
        console.log("error on PUT /users/:id", err);
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

server.listen(port, () => console.log(`\n API running on port ${port} \n`));

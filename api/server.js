// BUILD YOUR SERVER HERE
const {
  find,
  findById,
  insert,
  update,
  remove,
  resetDB,
} = require("./users/model.js");

const express = require("express");
const server = express();
server.use(express.json({ extended: true }));

server.get("/api/users", (req, res) => {
  find()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      res.status(500).json({ message: "cannot get users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else if (!user.bio || !user.name) {
        res
          .status(500)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "cannot get users" });
    });
});

server.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    insert(user)
      .then((newUser) => {
        console.log(newUser);
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const selectedUser = await findById(id);
  if (!selectedUser) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else {
    remove(id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        es.status(500).json({ message: "The user could not be removed" });
      });
  }
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const change = req.body;
  const selectedUser = findById(id);
  if (!selectedUser) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist" });
  } else if (!change.name || !change.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    update(id, change)
      .then((updatedUser) => {
        res.status(200).json(updatedUser);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "The user information could not be modified" });
      });
  }
});

server.use("*", (req, res) => {
  res.send("test test");
});

module.exports = server; // EXPORT YOUR SERVER instead of {}

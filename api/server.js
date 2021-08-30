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

server.get("/api/users", (req, res) => {
  find()
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      console.log(err);
    });
});

server.use("*", (req, res) => {
  res.send("test test");
});

module.exports = server; // EXPORT YOUR SERVER instead of {}

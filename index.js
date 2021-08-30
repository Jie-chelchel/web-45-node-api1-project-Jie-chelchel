const server = require("./api/server");
const express = require("express");
server.use(express.json());
const port = 5000;

// START YOUR SERVER HERE

server.listen(port, () => {
  console.log(`Listening on port :${port} `);
});

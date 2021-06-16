const env = require("dotenv");
const express = require("express");
var cookieParser = require("cookie-parser");
// const fileUpload = require('express-fileupload');
var cors = require("cors");
const app = express();
require("./db/conn");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// link the router files
app.use(require("./router/auth"));

var server = require("http").createServer(app);
var io = require("socket.io")(server, { cors: { origin: "*" } });

env.config();
const PORT = process.env.PORT;

// socket.io code here
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  // Emitting a new message. Will be consumed by the client
  socket.on("Message", (data) => {
    socket.broadcast.emit("Message", data);
  });
});

server.listen(PORT, () => {
  console.log(`server is running at pport no ${PORT}`);
});

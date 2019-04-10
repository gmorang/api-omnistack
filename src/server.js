const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://admin:teste1303@cluster0-gvfuv.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true }
);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "temp")));

app.use(require("./routes"));

server.listen(3333);

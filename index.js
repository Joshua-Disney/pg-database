require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const hubsRouter = require("./hubs/hubs-router");
const usersRouter = require("./users/users-router");
const messagesRouter = require("./messages/messages-router");

const server = express();

server.use(morgan("dev"));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/hubs", hubsRouter);
server.use("/users", usersRouter);
server.use("/messages", messagesRouter);

server.get("/", (req, res) => {
  res.status(200).json({ status: "The After Hours server is running!!" });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log("All your server are belong to us!  :D");
});

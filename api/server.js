const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const topicsRouter = require("../topics/topics-router");
const surveysRouter = require("../surveys/surveys-router");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/topics", topicsRouter);
server.use("/surveys", surveysRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the Apollo API!", server_status: "Running" });
});

module.exports = server;

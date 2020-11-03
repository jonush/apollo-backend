const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("./users/users-router");
const topicsRouter = require("./topics/topics-router");
const membersRouter = require("./topic_members/members-router");
const surveysRouter = require("./surveys/surveys-router");
const questionsRouter = require("./questions/questions-router");
const surveyQuestionsRouter = require("./survey_questions/surv-ques-router");
const responsesRouter = require("./responses/responses-router");
const commentsRouter = require("./comments/comments-router");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/topics", topicsRouter);
server.use("/topic-members/", membersRouter);
server.use("/surveys", surveysRouter);
server.use("/questions", questionsRouter);
server.use("/survey-questions", surveyQuestionsRouter);
server.use("/responses", responsesRouter);
server.use("/comments", commentsRouter);

server.get("/", (req, res) => {
  res.json({ message: "Welcome to the Apollo API!", server_status: "Running" });
});

module.exports = server;

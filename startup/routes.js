const express = require("express");
const projects = require("../routes/projects");
const programmingTools = require("../routes/programmingTools");
const users = require("../routes/users");
const login = require("../routes/login.js");
const mail = require("../routes/mail");

function setRoutes(app) {
  app.use(express.json());
  app.use("/api/projects", projects);
  app.use("/api/tools", programmingTools);
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use("/api/mail", mail);
}

module.exports = setRoutes;

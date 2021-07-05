require("dotenv").config();

const express = require("express");
const app = express();
const { required } = require("joi");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const setRoutes = require("./startup/routes");
const database = require("./startup/databaseConnection");

// app.use(function (err, req, res, next) {
//   logger.error(err.messsage, err);
//   res.status(500).send("middleware error handler called");
// });

database.connect();
setRoutes(app);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

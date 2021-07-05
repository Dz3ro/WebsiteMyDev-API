require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const setRoutes = require("./startup/routes");
const database = require("./startup/databaseConnection");
const setHeaders = require("./middleware/setHeader");

database.connect();
setHeaders(app);
setRoutes(app);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

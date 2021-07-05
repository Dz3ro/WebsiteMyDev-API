// this function is used to set some headers without it axios can't
// connect to app

function setHeaders(app) {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    // handle OPTIONS method
    if ("OPTIONS" == req.method) {
      return res.sendStatus(200);
    } else {
      next();
    }
  });
}

module.exports = setHeaders;

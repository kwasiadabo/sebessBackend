function appVariables() {
  var express = require("express");
  var bodyparser = require("body-parser");
  var cors = require("cors");
  var app = express();
  const Router = express.Router();

  app.use(bodyparser.urlencoded({ extende: true }));
  app.use(bodyparser.json());
  app.use(cors());
  const xyz = app.use("/api", Router);
}

module.exports = appVariables;

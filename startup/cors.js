const cors = require("cors");
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

module.exports = function (app) {
  app.options("*", cors(corsOptions));
  app.use(cors(corsOptions));
};

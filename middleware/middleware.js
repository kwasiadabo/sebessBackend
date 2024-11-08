const express = require("express");
const router = express.Router();

router.use((request, response, next) => {
  console.log("middleware");
  next();
});

module.exports = router;

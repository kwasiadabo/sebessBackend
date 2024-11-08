const menus = require("../models/menus");
const express = require("express");
const { response } = require("express");
const router = express.Router();

router.get("/menus/:val", (request, response) => {
  menus.getMenus(request.params.val).then((result) => {
    console.log(result[0]);
    response.json(result[0]);
  });
});

router.get("/all", (request, response) => {
  menus.allMenus().then((result) => {
    console.log(result);
    response.json(result);
  });
});

module.exports = router;

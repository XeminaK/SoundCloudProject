"use strict";
const express = require("express");
const categories = express.Router();

categories.get("/categories", function(req,res) {
  res.send("GET");
})

module.exports = categories;
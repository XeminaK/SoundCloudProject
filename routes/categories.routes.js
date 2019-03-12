"use strict";
const express = require("express");
const categories = express.Router();
const pool = require("./connection");

categories.get("/categories", function(req,res) {
  pool.query("select * from categories").then(function(result){
    res.send(result.rows);
  });
});

module.exports = categories;
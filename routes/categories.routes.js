"use strict";
const express = require("express");
const categories = express.Router();
const pool = require("./connection");

categories.get("/categories", function(req,res) {
  pool.query("select * from categories order by id asc").then(function(result){
    res.send(result.rows);
  });
});

categories.post("/categories", function(req, res) {
  pool.query("insert into categories (name) values ($1::text)", [req.body.category]).then(function() {
    pool.query("select * from categories order by id asc").then(function(result) {
      res.send(result.rows);
    });
  });
});

module.exports = categories;
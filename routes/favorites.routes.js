"use strict";
const express = require("express");
const favorites = express.Router();
const pool = require("./connection");

favorites.get("/favorites", function(req,res) {
  pool.query("select * from favorites order by id asc").then(function(result) {
    res.send(result.rows)
  })
});

favorites.post("/favorites", function(req,res) {
  pool.query("insert into favorites (data) values ($1::jsonb)", [req.body]).then(function() {
    pool.query("select * from favorites order by id asc").then(function(result) {
        res.send(result.rows)
      })
  });
});

favorites.delete("/favorites/:id", function(req,res) {
    pool.query("delete from favorites where id=$1::int", [req.params.id]).then(function() {
        pool.query("select * from favorites order by id asc").then(function(result) {
            res.send(result.rows)
        });
    });
});

module.exports = favorites;
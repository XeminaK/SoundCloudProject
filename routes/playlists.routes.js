"use strict";
const express = require("express");
const playlists = express.Router();
const pool = require("./connection");

playlists.get("/playlists", function(req,res) {
  pool.query("select * from playlists").then(function(result) {
    res.send(result.rows);
  });
});

playlists.post("/playlists", function(req, res){
  pool.query("insert into playlists (name, category, tags, data) values ($1::text, $2::text, $3::array, $4::json)", [req.body.name, req.body.category, req.body.tags, req.body.data]).then(function(){
    pool.query("select * from playlists").then(function(result) {
      res.send(result.rows);
    });
  });
});

module.exports = playlists;
"use strict";
const express = require("express");
const playlists = express.Router();

playlists.get("/playlists", function(req,res) {
  res.send("GET");
});

playlists.post("/playlists", function(req, res){
  res.send("post");
  console.log(req.body);
});

module.exports = playlists;
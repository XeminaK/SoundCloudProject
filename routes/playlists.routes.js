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
  pool.query("insert into playlists (name, category, tags, data) values ($1::text, $2::text, $3::text[], $4::jsonb)", [req.body.name, req.body.category, req.body.tags, req.body.data]).then(function(){
    pool.query("select * from playlists").then(function(result) {
      res.send(result.rows);
    });
  });
});

playlists.delete("/playlists/:id", function(req, res) {
  pool.query("delete from playlists where id=$1::int", [req.params.id]).then(function() {
    pool.query("select * from playlists").then(function(result) {
      res.send(result.rows);   
    })
  })
})

playlists.put("/playlists/:id", function(req, res) {
  pool.query("update playlists set tags=$1::text[], data=$2::jsonb where id=$3::int", [[], {}, req.params.id]).then(function() {
    pool.query("update playlists set name=$1::text, category=$2::text, tags=$3::text[], data=$4::jsonb where id=$5::int", [req.body.name, req.body.category, req.body.tags, req.body.data, req.params.id]).then(function() {
      pool.query("select * from playlists").then(function(result) {
        res.send(result.rows);
      })
    })
  })
})

module.exports = playlists;
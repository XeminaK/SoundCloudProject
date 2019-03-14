"use strict";

const express = require("express");
const app = express();

const categories = require("./routes/categories.routes");
const playlists = require("./routes/playlists.routes");

app.use(express.static("./public"));
app.use(express.json());

app.use("/", categories);
app.use("/", playlists);

app.listen(8080, function() {
  console.log("Server is running");
})
"use strict";

const express = require("express");
const app = express();

const categories = require("./routes/categories.routes");
const playlists = require("./routes/playlists.routes");

app.use(express.urlencoded({ parameterLimit: 100000000, limit: "50mb", extended: true }));
app.use(express.static("./public"));
app.use(express.json());

app.use("/", categories);
app.use("/", playlists);

const port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log("Server is running", port);
})
// app.listen(8080, function() {
//   console.log("Server is running");
// })
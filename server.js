"use strict";

// https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b

const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(cors({
  credentials: true,
}));

const categories = require("./routes/categories.routes");
const playlists = require("./routes/playlists.routes");

app.use(express.static("./public"));
app.use(express.json());

app.use("/", categories);
app.use("/", playlists);

app.get('/', (req, res) => {
  console.log(req.headers)
})

app.listen(8080, function() {
  console.log("Server is running");
})
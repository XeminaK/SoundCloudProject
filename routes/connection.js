"use strict";

const pg = require("pg");
const credentials =  new pg.Pool({
   user: "postgres",
   password: "password",
   host: "localhost",
   port: 5432,
   database: "cloudieDB",
   ssl: false
})

module.exports = credentials;
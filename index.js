const express = require("express");
const app = express();
const apicache = require("apicache");
let cache = apicache.middleware;
const port = process.env.PORT || 3000;

const errorHandling = require("./app/middleware/error.middleware");

require("dotenv").config();

app.use(cache("1 hour"));
const komik = require("./app/komik/komik.controller");
app.use("/api/komik", komik);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

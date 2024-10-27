const express = require("express");
const mongoDB = require("mongoDB");

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log("server is running...");
});



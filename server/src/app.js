const express = require("express");

require("dotenv").config();

const api = require("./api");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

module.exports = app;

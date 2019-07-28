const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

require('./models/Trip');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const tripsRoutes = require("./routes/trips");

const app = express();

// MongoDB Setup
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.mongoURI,
  { useNewUrlParser: true }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send('test')
});

app.use("/api/trips", tripsRoutes);

// if not found defaults to react app

if (app.get("env") !== "development")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

module.exports = app;

require("dotenv").config();
require("./helpers/hbs");

const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
// const hbs = require("hbs");

const app = express();

// require database configuration
require("./configs/db.config");

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// hbs.registerPartials(path.join(__dirname, "views/partials"));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      V  V  V
app.use("/", require("./routes/index.routes")); //??????????

// connect routers
const indexRouter = require("./routes/index.routes");
const MoviesRouter = require("./routes/movies.routes");
const CelebRouter = require("./routes/celebrities.routes");
//      |  |  |
//      V  V  V
// use routers
app.use("/", indexRouter); // use routers
app.use("/movies", MoviesRouter); // use artist router
app.use("/celebrities", CelebRouter); // use album router

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log("http://localhost:3000");

module.exports = app;

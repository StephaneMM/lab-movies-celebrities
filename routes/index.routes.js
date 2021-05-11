const express = require("express");
const router = express.Router();
const CelebModel = require("./../models/Celeb.model");
const MoviesModel = require("./../models/Movies.model");

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

module.exports = router;

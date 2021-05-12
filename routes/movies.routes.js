const express = require("express");
const router = new express.Router();
const CelebModel = require("../models/Celeb.model");
const MoviesModel = require("../models/Movies.model");

router.get("/", (req, res, next) => {
    MoviesModel.find();
    MoviesModel.find().populate("cast")
    .then((dbResult)=> res.render("movies", {
     movies: dbResult}))
     .catch((dbErr) => next(dbErr));
     });

     // GET - create one album (form)
router.get("/new", (req, res, next) => {
    console.log("creation get form OK");
    res.render("movies/movieCreate.hbs");
  });
  
  // POST - create one album
  router.post("/create", (req, res, next) => {
    MoviesModel.create(req.body)
    .then((dbResult) => {
      console.log("creation OK");
      res.redirect("/movies"); //mettre la route de la page visée !!!
    })
    .catch(res.render("movies/movieCreate.hbs"));
  
  });
  
  router.get("/:id/delete/", (req, res, next) => {
    MoviesModel.findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/movies"))
    .catch((dbErr) => next(dbErr));
  });
  
  // // GET - update one movie (form)
  router.get("/:id/edit", (req, res, next) => {
    MoviesModel.findById(req.params.id);
    MoviesModel.find().populate("celeb")
      .then((dbResult) => {
        res.render("movies/movieUpdate.hbs", {
          movie: dbResult,
        });
      })
      .catch((dbErr) => next(dbErr));
  });
  
  // // POST - update one movie
  router.post("/:id/edit", (req, res, next) => {
    // Iteration #4: Update the drone
    // ... your code here
    MoviesModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbResult) => {
        res.redirect("/movies"); //mettre la ROUTE de la page visée !!!
      })
      .catch((dbError) => next(dbError));
  });
     module.exports = router;
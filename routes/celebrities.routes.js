const express = require("express");
const router = new express.Router();
const CelebModel = require("../models/Celeb.model");
const MoviesModel = require("../models/Movies.model");

// GET - all albums
router.get("/",(req, res, next) => {
  CelebModel.find()
  .then((dbResult) =>
    res.render("celebrities/celebrities.hbs", {
      celebs: dbResult,
    })
  ).catch((dbErr) => next(dbErr));
});

// GET - create one album (form)
router.get("/new", (req, res, next) => {
  console.log("creation get form OK");
  res.render("celebrities/celebrityCreate.hbs");
});

// POST - create one album
router.post("/create", (req, res, next) => {
  CelebModel.create(req.body)
  .then((dbResult) => {
    console.log("creation OK");
    res.redirect("/celebrities"); //mettre la route de la page visée !!!
  })
  .catch(res.render("celebrities/celebrityCreate.hbs"));

});

router.get("/:id/delete/", (req, res, next) => {
  CelebModel.findByIdAndRemove(req.params.id)
  .then(() => res.redirect("/celebrities"))
  .catch((dbErr) => next(dbErr));
});

// // GET - update one celebrity (form)
router.get("/:id/edit", (req, res, next) => {
  CelebModel.findById(req.params.id)
    .then((dbResult) => {
      res.render("celebrities/celebrityUpdate.hbs", {
        celeb: dbResult,
      });
    })
    .catch((dbErr) => next(dbErr));
});

// // POST - update one album
router.post("/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  CelebModel.findByIdAndUpdate(req.params.id, req.body)
    .then((dbResult) => {
      res.redirect("/celebrities"); //mettre la ROUTE de la page visée !!!
    })
    .catch((dbError) => next(dbError));
});



module.exports = router;

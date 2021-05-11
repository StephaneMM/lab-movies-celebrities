const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const moviesSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: "celebrities" }],
  },

  {
    timestamps: true,
  }
);

const MoviesModel = model("movies", moviesSchema);
module.exports = MoviesModel;

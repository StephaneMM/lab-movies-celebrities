const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const celebSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
);

const CelebModel = model("celebrities", celebSchema);
module.exports = CelebModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    synopsis: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    actors: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);

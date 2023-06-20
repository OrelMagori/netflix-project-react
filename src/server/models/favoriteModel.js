const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    synopsis: {
      type: String,
    },
    director: {
        type: Array,
    },
    actors: {
      type: Array,
    },
    country: {
      type: String,
    },
    date: {
      type: String,
    },
    id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    name: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
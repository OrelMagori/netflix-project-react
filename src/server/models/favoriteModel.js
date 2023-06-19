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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
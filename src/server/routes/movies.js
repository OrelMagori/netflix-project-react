const express = require("express");

const { getAllMovies, deleteMovie } = require("../controllers/movieController");

const router = express.Router();

router.get("/", getAllMovies);

router.delete("/delete", deleteMovie);

module.exports = router;

const express = require("express");

const {getAllFavorites ,deleteFavorite, addFavorite} = require("../controllers/favoriteController");

const router = express.Router();

router.get("/", getAllFavorites);

router.delete("/delete", deleteFavorite); 

router.post("/add", addFavorite);

module.exports = router;
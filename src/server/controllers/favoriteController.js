const Favorite = require("../models/favoriteModel");
const User = require("../models/userModel");
const { Types } = require('mongoose');

const getAllFavorites = async (req, res) => {
    console.log(req);
  const {userId} = req.query;

  try {
  const user = await User.findById(userId).populate('favorites');
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  const favorites = user.favorites;

  const favoritesArray = favorites.map(favorite => {
  return {
    synopsis: favorite.synopsis,
    director: favorite.director,
    actors: favorite.actors,
    country: favorite.country,
    date: favorite.date,
    id: favorite.id,
    type: favorite.type,
    name: favorite.name,
    image: favorite.image
  };
});
console.log(favoritesArray)
    res.status(200).json({ messg: "favorites fetched successfuly", favoritesArray });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
    }

const deleteFavorite = async (req, res) => {
  const { user, id } = req.body;
    try {
        // const favorite = await Favorite.findByIdAndDelete(id);
        // console.log(favorite)

        const foundUser = await User.findById(user).populate('favorites');
        const favoriteId = await Favorite.findOne({id:id});
        console.log("first")
        console.log(favoriteId)
        const filteredFavorites = foundUser.favorites.filter((favorite) => favorite.id !== favoriteId.id);
        console.log("second")
        console.log(filteredFavorites)

        foundUser.favorites = filteredFavorites;
        await foundUser.save();
        res.status(200).json({ messg: "favorite deleted successfuly", favoriteId });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

    const addFavorite = async (req, res) => {
        const { synopsis, director, actors, country, date, id, type, name, image } = req.body;
        const { user } = req.body;
        try {
            
            const favorite = await Favorite.create({ synopsis, director, actors, country, date, id, type, name,image });
            console.log(favorite);
            const foundUser = await User.findById(user);
            console.log(foundUser);
            foundUser.favorites.push(favorite);
            await foundUser.save();
            console.log(favorite);
            res.status(200).json({ messg: "favorite added successfuly", favorite });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
        

    module.exports = {
        getAllFavorites,
        deleteFavorite,
        addFavorite
      };
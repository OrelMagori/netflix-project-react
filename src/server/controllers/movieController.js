const Movie = require("../models/movieModel");
const User = require("../models/userModel");

const getAllMovies = async (req, res) => {
    console.log(req);
  const {userId} = req.query;

  try {
  const user = await User.findById(userId).populate('movies');
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }
  const movies = user.movies;

  const moviesArray = movies.map(movie => {
  return {
    synopsis: movie.synopsis,
    director: movie.director,
    actors: movie.actors,
    country: movie.country,
    year: movie.year,
    id: movie._id,
  };
});
console.log(moviesArray)
    res.status(200).json({ messg: "movies fetched successfuly", moviesArray });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
    }

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    const { user, name } = req.body;
    try {
        const movie = await Movie.findByIdAndDelete(id);
        console.log(movie)

        const foundUser = await User.findById(user).populate('movies');
        foundUser.movies = foundUser.movies.filter(x => x.id!==id)
        console.log(foundUser.movies)
        await foundUser.save();

        res.status(200).json({ messg: "movie deleted successfuly", movie });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    }

    module.exports = {
        getAllMovies,
        deleteMovie,
      };
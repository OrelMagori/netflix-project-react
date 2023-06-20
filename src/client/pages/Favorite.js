import React, {useState,useEffect}from "react";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Navigator from "../components/Navigator";
import "./Favorite.css";

export const Favorite = () => {

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const { apiCall } = useApiContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let api = `favorites?userId=${user?._id}`;
        const { data } = await apiCall(api);
        console.log(data.favoritesArray)
        const moviesArray = data.favoritesArray.filter((item) => item.type === "movie");
        const seriesArray = data.favoritesArray.filter((item) => item.type === "tv");
        setMovies(moviesArray);
        setSeries(seriesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, []);

  const openPopup = (content) => {
    console.log(content);
    window.alert(content.synopsis + " " + content.director + " " + content.actors + " " + content.country + " " + content.date);
  };

  return (
    <div>
      <Navigator />
      <h1>Favorite</h1>
      <div>
        <h2>Movies</h2>
        <div className="movies-container">
          {movies.map((movie) => (
            <div className="movie-item" key={movie.id} onClick={() => openPopup(movie)}>
              <img src={movie.image} alt={movie.title} />
              <p>{movie.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Series</h2>
        <div className="series-container">
          {series.map((serie) => (
            <div className="serie-item" key={serie.id} onClick={() => openPopup(serie)}>
              <img src={serie.image} alt={serie.title} />
              <p>{serie.name}</p>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
};

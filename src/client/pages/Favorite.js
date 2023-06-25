import React, {useState,useEffect}from "react";
import { useApiContext } from "../hooks/useApiContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Navigator from "../components/Navigator";
import "./Favorite.css";

export const Favorite = () => {

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [myFavoriteAarray, setMyFavoriteAarray] = useState([]);

  const { apiCall } = useApiContext();
  const { user } = useAuthContext();

  const fetchFavorites = async () => {
    try {
      let api = `favorites?userId=${user?._id}`;
      const { data } = await apiCall(api);
      console.log(data.favoritesArray)
      setMyFavoriteAarray(data.favoritesArray);
      const moviesArray = data.favoritesArray.filter((item) => item.type === "movie");
      const seriesArray = data.favoritesArray.filter((item) => item.type === "tv");
      setMovies(moviesArray);
      setSeries(seriesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const openPopup = (content) => {
    console.log(content);
    // window.alert(content.synopsis + " " + content.director + " " + content.actors + " " + content.country + " " + content.date);
  };

  const deleteItem = async (item, event) => {
    event.preventDefault();
    console.log(item);
    let id = item?.movie?.id || item?.serie?.id;
    console.log(id)
    console.log(user)
    try {
      const { status, data } = await apiCall("favorites/delete", "DELETE", {
        user: user,
        id: id
      });
      console.log(status);
      console.log(data);
      fetchFavorites();
    }
    catch (error) {
      console.log(error);
    }
  }

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
              <button onClick={(e) => deleteItem({ movie }, e)}>Delete</button>
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
              <button onClick={(e) => deleteItem({ serie }, e)}>Delete</button>
            </div>
          ))}
      </div>
      </div>
    </div>
  );
};

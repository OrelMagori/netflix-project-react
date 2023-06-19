import React, { useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";

export default function Search() {
  const [showSearch, toggleSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearchButtonClick = () => {
    toggleSearch(!showSearch);
    if (showSearch) {
      searchMoviesAndSeries();
    }
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      toggleSearch(false);
      searchMoviesAndSeries();
    }
  };

  const searchMoviesAndSeries = () => {
    // setIsLoading(true);
    // axios
    //   .get(`https://imdb-api.com/API/SearchSeries/k_3k6urw6m/${searchText}`)
    //   .then((response) => {
    //     setMoviesAndSeries(response.data.results);
    //     setIsLoading(false);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     setIsLoading(false);
    //   });
    setIsLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/search/multi?api_key=76b2e1dade8134109dd065e6ad8ad30a&query=${searchText}`)
      .then((response) => {
        const filteredResults = response.data.results.filter(result => result.media_type === 'movie' || result.media_type === 'tv');
        setMoviesAndSeries(filteredResults);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

// GET MOVIE CREDITS
//   const fetch = require('node-fetch');

//   const url = `https://api.themoviedb.org/3/movie/${fav.id}/credits`;
//   const options = {
//   method: 'GET',
//   headers: {
//      accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmIyZTFkYWRlODEzNDEwOWRkMDY1ZTZhZDhhZDMwYSIsInN1YiI6IjY0OGZlZjUyNTU5ZDIyMDBmZjExY2MxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EYn7IRsPq0tmYsejv-hWBZp4EcLTiP9ST7GakhwRdiY'
// }
// };

// fetch(url, options)
// .then(res => res.json())
// .then(json => console.log(json))
// .catch(err => console.error('error:' + err));

  const handleImageClick = (content) => {
    const isAlreadyAdded = favorites.some((fav) => fav.id === content.id);

    if (isAlreadyAdded) {
      toast.error("Item already added to favorites");
    } else {
        setFavorites((prevFavorites) => {
        const updatedFavorites = [...prevFavorites, content];
        console.log(updatedFavorites); // Print updated favorite array
        return updatedFavorites;
      });
      toast.success("Item added to favorites");
    }
  };

  return (
    <>
    <div className="search-container">
      {showSearch ? (
        <input
          type="text"
          className="search-input"
          placeholder="Search Movies or Series"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleSearchInputKeyPress}
        />
      ) : null}

        <button
          className="search-button"
          onClick={handleSearchButtonClick}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
          <FiSearch style={{ size: 25, color: "white" }} className="search-icon"/>
        </button>
        </div>
      <div>
        {isLoading ? (
          <div className="loading">
            <RingLoader
              className="spinner"
              size={60}
              color={"#123abc"}
              loading={isLoading}
            />
          </div>
        ) : moviesAndSeries.length > 0 ? (
          <div className="image-container">
            {moviesAndSeries.map((content) => (
              <img
                key={content.id}
                src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                alt={content.title}
                onClick={() => handleImageClick(content)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
}

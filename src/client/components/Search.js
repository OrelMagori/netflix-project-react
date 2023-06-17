import React, { useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";

export default function Search() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearchButtonClick = () => {
    setShowSearch(true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMoviesAndSeries();
    }
  };

  const searchMoviesAndSeries = () => {
    setIsLoading(true);
    axios
      .get(`https://imdb-api.com/API/Search/k_3k6urw6m/${searchText}`)
      .then((response) => {
        setMoviesAndSeries(response.data.results);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

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
    <div className="search-container">
      {!showSearch && (
        <button
          className="search-button"
          onClick={handleSearchButtonClick}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        >
          <FiSearch style={{ size: 25, color: "white" }} />
        </button>
      )}

      {showSearch && (
        <input
          type="text"
          className="search-input"
          placeholder="Search Movies or Series"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleSearchInputKeyPress}
        />
      )}

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
                src={content.image}
                alt={content.title}
                onClick={() => handleImageClick(content)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { RingLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

import "./Search.css";
import dev from "../dev.json";
import iosData from "../../database/ios.json";
import { useApiContext } from "../../hooks/useApiContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Search() {
  const [favorites, setFavorites] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSearch, toggleSearch] = useState(false);
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);

  const { apiCall } = useApiContext();
  const { user } = useAuthContext();
  const fetch = require("node-fetch");

  const apiKey = dev.apiKey;
  const authToken = dev.authToken;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        let api = `favorites?userId=${user?._id}`;
        const { data } = await apiCall(api);
        console.log(data);
        setFavorites(data.favoritesArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, [apiCall, user?._id]);

  const getCountryFromLanguageCode = (languageCode) => {
    const language = iosData[languageCode];
    if (language) {
      const countries = language.countries;
      if (countries && countries.length > 0) {
        return countries[0];
      }
    }
    return "";
  };

  const handleSearchButtonClick = () => {
    toggleSearch(!showSearch);
    if (showSearch) {
      searchMoviesAndSeries();
    }
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      toggleSearch(false);
      searchMoviesAndSeries();
    }
  };

  const searchMoviesAndSeries = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchText}`
      )
      .then((response) => {
        const filteredResults = response.data.results.filter(
          (result) =>
            result.media_type === "movie" || result.media_type === "tv"
        );
        setMoviesAndSeries(filteredResults);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleImageClick = async (content, item) => {
    let name = content.name || content.title;
    let cast = [];
    let crew = [];
    const isAlreadyAdded = favorites.some((fav) => fav.id === content.id);

    const url = `https://api.themoviedb.org/3/movie/${content.id}/credits`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const res = await fetch(url, options);
      const json = await res.json();
      console.log(json);
      cast = json?.cast;
      crew = json?.crew;
      content.cast = cast;
      content.crew = crew;
      console.log(content);
      if (isAlreadyAdded) {
        toast.error(`"${name}" already added to favorites`);
        // toast.error("Item already added to favorites");
      } else {
        setFavorites((prevFavorites) => {
          const updatedFavorites = [...prevFavorites, content];
          console.log(updatedFavorites);
          return updatedFavorites;
        });

        try {
          console.log(content.crew);
          const directors = content?.crew?.filter(
            (x) => x.department === "Directing"
          );
          const actors = content?.cast?.filter(
            (x) => x.known_for_department === "Acting"
          );
          const country = getCountryFromLanguageCode(content.original_language);
          const { status, data } = await apiCall("favorites/add", "POST", {
            synopsis: content.overview,
            director: directors?.map((director) => director.name),
            actors: actors?.map((actor) => actor.name),
            country: country,
            date: content.release_date,
            id: content.id,
            user: user,
            type: content.media_type,
            name: content.title || content.name,
            image: `https://image.tmdb.org/t/p/w500${content.poster_path}`,
          });
          // toast.success("Item added to favorites");
          toast.success(`"${name}" added to favorites`);

          console.log(status);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      console.error("Error:", err);
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

        <button className="search-button" onClick={handleSearchButtonClick}>
          <FiSearch
            className="search-icon"
            style={{ size: 25, color: "white" }}
          />
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
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

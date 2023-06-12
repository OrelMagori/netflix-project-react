import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { RingLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Search.css';

export default function Search() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleSearchButtonClick = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      searchMoviesAndSeries();
    }
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsSearching(false);
      searchMoviesAndSeries();
    }
  };

  const searchMoviesAndSeries = () => {
    setIsLoading(true);
    axios
      .get(`https://imdb-api.com/API/Search/k_3k6urw6m/${searchText}`)
      .then((response) => {
        // handle success
        setMoviesAndSeries(response.data.results);
        console.log(moviesAndSeries);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleImageClick = (content) => {
    // Check if the image is already in favorites
    const isAlreadyAdded = favorites.some((fav) => fav.id === content.id);
  
    if (isAlreadyAdded) {
      toast.error('Item already added to favorites');
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, content]);
      toast.success('Item added to favorites');
    }
  };
  

  console.log(favorites);

  return (
    <div>
      <div className="search-container">
        {isSearching ? (
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleSearchInputKeyPress}
          />
        ) : (
          <button className="search-button" onClick={handleSearchButtonClick}>
            {isSearching ? 'Hide' : <FiSearch />}
          </button>
        )}
      </div>
      {isLoading ? (
        <div className="loading">
          <RingLoader
            className="spinner"
            size={60}
            color={'#123abc'}
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
      <ToastContainer />
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { RingLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Search.css';

export default function Search() {
  const [showSearch, toggleSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
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
      toast.error('Item already added to favorites');
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, content]);
      toast.success('Item added to favorites');
    }
  };

  return (
    <div>
      <div className="SearchInputAndButton">
        {showSearch ? (
          <input
            type="text"
            placeholder="Search Movies or Series"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleSearchInputKeyPress}
          />
        ) : null}

        <button
          onClick={handleSearchButtonClick}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
        >
          <FiSearch size={25} color="white" />
        </button>
      </div>

      <div>
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
    </div>
      <ToastContainer />
    </div>
  );
}


// import React,{useState} from 'react'
// import axios from "axios"

// export default function Search() {

// const [searchText, setSearchText] = useState("");
// const [moviesAndSeries, setMoviesAndSeries] = useState([]); 

// const searchMoviesAndSeries = () => {
//     console.log(searchText.length)
//     if(searchText.length > 1) {
//     axios
//       .get("https://imdb-api.com/API/Search/k_3k6urw6m/" + searchText)
//       .then((response) => {
//         // handle success
//         setMoviesAndSeries(response.results);
//         console.log(moviesAndSeries)
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       });
//     }
//     else {
//       setMoviesAndSeries([]);
//       window.alert("Search text must be at least 2 characters long");
//     }
//   };


//   return (
//     <div>
//         <input onChange={(e) => setSearchText(e.target.value)} />
//         <button onClick={searchMoviesAndSeries}>Search</button>
//     </div>
//   )
// }

import React, { useState } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);
  const [showSearchField, setShowSearchField] = useState(true);

  const handleSearchClick = () => {
    setShowSearchField(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchMoviesAndSeries();
  };

  const searchMoviesAndSeries = () => {
    if (searchText.length < 2) {
      setMoviesAndSeries([]);
      window.alert('Search text must be at least 2 characters long');
      return;
    }
    axios
      .get('https://imdb-api.com/API/Search/k_3k6urw6m/' + searchText)
      .then((response) => {
        setMoviesAndSeries(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
        window.alert('An error occurred while searching.');
        setMoviesAndSeries([]);
      });
  };

  const handleContentClick = (content) => {
    // Logic to save the selected content as favorite
    console.log('Selected Content:', content);
  };

  return (
    <div>
      {showSearchField ? (
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={searchText} onChange={handleSearchTextChange} />
          <button type="submit">Search</button>
        </form>
      ) : (
        <button onClick={() => setShowSearchField(true)}>Open Search Field</button>
      )}

      {moviesAndSeries.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {moviesAndSeries.map((content) => (
              <li key={content.id} onClick={() => handleContentClick(content)}>
                {content.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


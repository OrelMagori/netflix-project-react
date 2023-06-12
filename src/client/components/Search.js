import React,{useState,useEffect} from 'react'
import axios from "axios"

import "./Search.css"

export default function Search() {

const [searchText, setSearchText] = useState("");
const [moviesAndSeries, setMoviesAndSeries] = useState([]); 

useEffect(() => {
    searchMoviesAndSeries();
  }, []);

const searchMoviesAndSeries = () => {
    console.log(searchText)
    axios
      .get("https://imdb-api.com/API/Search/k_3k6urw6m/" + searchText)
      .then((response) => {
        // handle success
        setMoviesAndSeries(response.data.results);
        console.log(moviesAndSeries)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };


  return (
    <div>
        <div className="search-container">
        <input onChange={(e) => setSearchText(e.target.value)} />
        <button onClick={searchMoviesAndSeries}>Search</button>
        </div>
        {moviesAndSeries.length > 0 && (
        <div className="image-container">
          {moviesAndSeries.map((content) => (
            <img
              key={content.id}
              src={content.image}
              alt={content.title}
            //   onClick={() => handleContentClick(content)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

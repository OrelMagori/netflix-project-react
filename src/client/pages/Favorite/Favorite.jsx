import React, { useState, useEffect, useRef } from "react";
import { FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "./Favorite.css";
import { useApiContext } from "../../hooks/useApiContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navigator from "../../components/Navigator/Navigator";
import ModalItem from "../../components/ModalItem/ModalItem";

export const Favorite = () => {
  const moviesContainerRef = useRef(null);
  const seriesContainerRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  // const [myFavoriteArray, setMyFavoriteArray] = useState([]);

  const { apiCall } = useApiContext();
  const { user } = useAuthContext();

  const fetchFavorites = async () => {
    try {
      let api = `favorites?userId=${user?._id}`;
      const { data } = await apiCall(api);
      console.log(data.favoritesArray);
      // setMyFavoriteArray(data.favoritesArray);
      const moviesArray = data.favoritesArray.filter(
        (item) => item.type === "movie"
      );
      const seriesArray = data.favoritesArray.filter(
        (item) => item.type === "tv"
      );
      setMovies(moviesArray);
      setSeries(seriesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPopup = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteItem = async (item, event) => {
    event.preventDefault();
    console.log(item);
    let id = item?.movie?.id || item?.serie?.id;
    console.log(id);
    console.log(user);
    try {
      const { status, data } = await apiCall("favorites/delete", "DELETE", {
        user: user,
        id: id,
      });
      console.log(status);
      console.log(data);
      fetchFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  const scrollLeft = (containerRef) => {
    containerRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = (containerRef) => {
    containerRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navigator />
      <ModalItem
        visible={modalVisible}
        onCancel={closeModal}
        content={modalContent}
      />
      <div className="row-container">
      <h2>{`${user.firstName}'s Favorites`}</h2>
        <div className="scroll-container">
          <h1>Movies</h1>
          <div className="movies-container" ref={moviesContainerRef}>
            {movies.map((movie) => (
              <>
                <div className="movie-item" key={movie.id}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    onClick={() => openPopup(movie)}
                  />
                  <button
                    className="delete-button"
                    onClick={(e) => deleteItem({ movie }, e)}
                  >
                    <FiTrash2 className="delete-icon" />
                  </button>
                </div>
              </>
            ))}
          </div>
          <button
            className="scroll-button-left"
            onClick={() => scrollLeft(moviesContainerRef)}
          >
            <FiChevronLeft className="arrow-icon" />
          </button>
          <button
            className="scroll-button-right"
            onClick={() => scrollRight(moviesContainerRef)}
          >
            <FiChevronRight className="arrow-icon" />
          </button>
        </div>
        <div className="scroll-container">
          <h1>Series</h1>
          <div className="series-container" ref={seriesContainerRef}>
            {series.map((serie) => (
              <div className="serie-item" key={serie.id}>
                <img
                  src={serie.image}
                  alt={serie.title}
                  onClick={() => openPopup(serie)}
                />
                <button
                  className="delete-button"
                  onClick={(e) => deleteItem({ serie }, e)}
                >
                  <FiTrash2 className="delete-icon" />{" "}
                </button>
              </div>
            ))}
          </div>
          <button
            className="scroll-button-left"
            onClick={() => scrollLeft(seriesContainerRef)}
          >
            <FiChevronLeft className="arrow-icon" />
          </button>
          <button
            className="scroll-button-right"
            onClick={() => scrollRight(seriesContainerRef)}
          >
            <FiChevronRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

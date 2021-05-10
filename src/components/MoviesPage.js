import { useState, useEffect } from "react";
import "../componentStyles/MoviesPage.css";
import Movie from "./Movie";
import LoadingAnimation from "./LoadingAnimation";

const MoviesPage = ({ moviesList }) => {
  const [posterAndLink, setposterAndLink] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const renderMovies = (e) => {
    let splitValue = "#split#here#";
    let res = e.split(splitValue);
    return (
      <Movie
        poster={res[0]}
        imdbLink={res[1]}
        watched={res[2]}
        title={res[3]}
        key={res[1]}
      />
    );
  };

  const showUnwatchedMovies = (element) => {
    for (let i = 0; i < element.length; i++) {
      if (element[i].className.includes("true")) {
        element[i].classList.toggle("show-movie");
      }
    }
  };

  const showWatchedMovies = (element) => {
    for (let i = 0; i < element.length; i++) {
      if (element[i].className.includes("false")) {
        element[i].classList.toggle("show-movie");
      }
    }
  };

  const showMoviesByWatchedProperty = () => {
    let selectionElement = document.getElementById("movie-selection");
    let choice = selectionElement.options[selectionElement.selectedIndex].value;

    let moviesSection = document.querySelector(".movies-section").children;

    // Reseting movies to prevent from not rendering
    for (let i = 0; i < moviesSection.length; i++) {
      if (moviesSection[i].className.includes("show-movie")) {
        moviesSection[i].classList.toggle("show-movie");
      }
    }

    if (choice !== "show-all") {
      choice === "watched"
        ? showWatchedMovies(moviesSection)
        : showUnwatchedMovies(moviesSection);
    }
  };

  const saveWatchlist = () => {
    let addWatchlistSection = document.querySelector(".add-watchlist-section");

    addWatchlistSection.classList.toggle("show-watchlist-section");
  };

  useEffect(() => {
    moviesList.then((resp) => {
      setposterAndLink(resp.posters);
      setIsPending(false);
    });
  });

  return (
    <div>
      <div className="notification-success-movies-page"></div>
      <div className="notification-fail-movies-page"></div>
      <nav className="navbar">
        <label htmlFor="movie-situation" className="movie-selection-list">
          Show selected movies:
        </label>
        <select name="movies" id="movie-selection">
          <option value="show-all">Show all</option>
          <option value="watched">Watched movies</option>
          <option value="unwatched">Unwatched movies</option>
        </select>
        <input
          type="button"
          value="Select"
          onClick={showMoviesByWatchedProperty}
          className="select-btn"
        />
      </nav>
      <div className="main-section">
        <div className="movies-section">
          {isPending && <LoadingAnimation />}
          {posterAndLink.map((e) => renderMovies(e))}
        </div>
        <div className="add-watchlist-section">
          <p>Add to watchlist:</p>
          <ul className="movie-names"></ul>
          <button className="save-watchlist-btn" onClick={saveWatchlist}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;

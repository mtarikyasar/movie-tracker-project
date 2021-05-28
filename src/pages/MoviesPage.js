import { useState, useEffect } from "react";
import "../componentStyles/MoviesPage.css";
import Movie from "../components/Movie";
import LoadingAnimation from "../components/LoadingAnimation";

const MoviesPage = ({ moviesList }) => {
  const [posterAndLink, setposterAndLink] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [movieNameState, setMovieNameState] = useState("");

  const searchFunction = (event) => {
    setMovieNameState(event.target.value.toLowerCase());
  };

  const showSelectedMovies = (event) => {
    let index = event.target.selectedIndex;
    let moviesSection = document.querySelector(".movies-section").children;
    console.log(moviesSection);

    for (let i = 0; i < moviesSection.length; i++) {
      if (moviesSection[i].className.includes("show-movie")) {
        moviesSection[i].classList.toggle("show-movie");
      }
    }

    switch (index) {
      case 0:
        break;

      case 1:
        showWatchedMovies(moviesSection);
        break;
      case 2:
        showUnwatchedMovies(moviesSection);
        break;

      default:
        break;
    }
  };

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
    console.log(element);
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

  const saveWatchlist = () => {
    let addWatchlistSection = document.querySelector(".add-watchlist-section");

    addWatchlistSection.classList.toggle("show-watchlist-section");
  };

  useEffect(() => {
    let moviesSection = document.querySelector(".movies-section");

    if (movieNameState === "") {
      for (let i = 0; i < moviesSection.children.length; i++) {
        moviesSection.children[i].hidden = false;
      }
    } else {
      for (let i = 0; i < moviesSection.children.length; i++) {
        moviesSection.children[i].hidden = false;

        console.log(moviesSection.children);
        let potName = moviesSection.children[
          i
        ].childNodes[0].innerHTML.toLowerCase();

        if (!potName.includes(movieNameState)) {
          moviesSection.children[i].hidden = true;
        }
      }
    }

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
        <input
          type="text"
          name="search-movie"
          id=""
          className="search-movie-input"
          placeholder="Search for movies"
          onChange={searchFunction}
        />
        <label htmlFor="movie-situation" className="movie-selection-list">
          Show selected movies:
        </label>
        <select
          name="movies"
          id="movie-selection"
          onChange={showSelectedMovies}
        >
          <option value="show-all">Show all</option>
          <option value="watched">Watched movies</option>
          <option value="unwatched">Unwatched movies</option>
        </select>
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

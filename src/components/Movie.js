import { Link } from "react-router-dom";
import env from "react-dotenv";
const Parse = require("parse");

const Movie = ({ poster, imdbLink, watched, title }) => {
  Parse.serverURL = "https://parseapi.back4app.com";
  Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);

  const sendNotification = (element, message) => {
    element.innerHTML = message;
    element.classList.toggle("show");

    setTimeout(() => {
      element.classList.toggle("show");
      window.location.reload();
    }, 2000);
  };

  const changeMovieState = (e) => {
    const query = new Parse.Query("Movies");
    query.equalTo("Poster", poster);

    let results = query.first();
    results.then((object) => {
      object.set("Watched", !object.attributes.Watched);
      object.save().then(() => {
        sendNotification(
          document.querySelector(".notification-success-movies-page"),
          `Movie state updated! Refreshing the page...`
        );
      });
    });
  };

  const deleteMovie = (e) => {
    const query = new Parse.Query("Movies");
    query.equalTo("Poster", poster);

    let results = query.first();
    results.then((object) => {
      object.destroy().then(() => {
        sendNotification(
          document.querySelector(".notification-fail-movies-page"),
          `Movie deleted! Refreshing the page...`
        );
      });
    });
  };

  const addWatchlist = (e) => {
    let addWatchlistSection = document.querySelector(".add-watchlist-section");

    if (!addWatchlistSection.className.includes("show-watchlist-section")) {
      addWatchlistSection.classList.toggle("show-watchlist-section");
    }

    let movieNamesSection = document.querySelector(".movie-names");
    let movieNamesList = [];

    // If there is more than 0 movie in the list
    if (movieNamesSection.children.length > 0) {
      for (let i = 0; i < movieNamesSection.children.length; i++) {
        movieNamesList.push(movieNamesSection.children[i].innerHTML);
      }

      if (!movieNamesList.includes(title)) {
        // let posterLink =
        //   e.target.parentElement.parentElement.children[0].children[0].src;
        // let imdbLink2 = e.target.parentElement.parentElement.children[0].href;

        let movieName = document.createElement("li");
        movieName.innerHTML = title;

        movieNamesSection.appendChild(movieName);
      }
    }
    // If there is no movie in the list
    else {
      // let posterLink =
      //   e.target.parentElement.parentElement.children[0].children[0].src;
      // let imdbLink2 = e.target.parentElement.parentElement.children[0].href;

      let movieName = document.createElement("li");
      movieName.innerHTML = title;

      movieNamesSection.appendChild(movieName);
    }
  };

  // To add multiple class names
  let classes = "movie " + watched;

  return (
    <div className={classes}>
      <Link
        to={{
          pathname: "/moviedetails",
          state: { name: title, watched: watched },
        }}
        key={imdbLink}
      >
        <img src={poster} alt="" key={poster + 1} />
      </Link>
      <div className="button-section">
        <button
          className="fas fa-plus add-watchlist-btn"
          onClick={(e) => addWatchlist(e)}
        ></button>
        <button className="change-movie-state-btn" onClick={changeMovieState}>
          Change State
        </button>
        <button
          className="fas fa-trash-alt delete-btn"
          onClick={deleteMovie}
        ></button>
      </div>
      <p hidden={true}>{title}</p>
    </div>
  );
};

export default Movie;

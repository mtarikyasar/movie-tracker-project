import env from "react-dotenv";
const Parse = require("parse");

const Movie = ({ poster, imdbLink, watched }) => {
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

  // To add multiple class names
  let classes = "movie " + watched;

  return (
    <div className={classes}>
      <a href={imdbLink} target="_blank" rel="noreferrer" key={imdbLink}>
        <img src={poster} alt="" key={poster + 1} />
      </a>
      <div className="button-section">
        <button className="change-movie-state" onClick={changeMovieState}>
          Change State
        </button>
        <button className="fas fa-trash-alt" onClick={deleteMovie}></button>
      </div>
    </div>
  );
};

export default Movie;

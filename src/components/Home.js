import env from "react-dotenv";
import "../componentStyles/Home.css";
import Recommendation from "./Recommendation.js";

const axios = require("axios");
const Parse = require("parse");

const Home = () => {
  // Initialize Parse server
  Parse.serverURL = "https://parseapi.back4app.com";
  Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);

  // Notification Function
  const sendNotification = (element, message) => {
    element.innerHTML = message;
    element.style.display = "initial";

    setTimeout(() => {
      element.style.display = "none";
    }, 2000);
  };

  // Click handle function
  const handleClick = async () => {
    const MovieClass = Parse.Object.extend("Movies");

    // Getting database to check if movie exists
    const query = new Parse.Query("Movies");
    const parseResults = await query.find();

    // Get input value
    let movieName = document.getElementById("movieNameInput").value;

    // If input value is not empty
    if (movieName !== "") {
      axios
        .get(
          "http://www.omdbapi.com/?t=" +
            movieName +
            "&apikey=" +
            env.OMDB_API_KEY
        )
        .then((response) => {
          // If movie exists on the parse database
          if (
            !parseResults.some(
              (e) => e.attributes.Title === response.data.Title
            )
          ) {
            // If movie not found
            if (response.data.Response === "False") {
              sendNotification(
                document.querySelector(".notification-fail"),
                `Movie '${movieName}' cannot be found! Please check if its spelled correctly.`
              );
            } else {
              console.log(response.data);
              // Initialize new Parse Object
              const movieObject = new MovieClass();

              // Adding movie details to Parse Database
              movieObject.set("Title", response.data.Title);
              movieObject.set("Director", response.data.Director);
              movieObject.set("Writer", response.data.Writer);
              movieObject.set("Country", response.data.Country);
              movieObject.set("Language", response.data.Language);
              movieObject.set("Genre", response.data.Genre);
              movieObject.set("Plot", response.data.Plot);
              movieObject.set("Poster", response.data.Poster);
              movieObject.set("ReleaseDate", response.data.Released);
              movieObject.set("Runtime", response.data.Runtime);
              movieObject.set("imdbRating", response.data.imdbRating);
              movieObject.set(
                "imdbLink",
                "https://www.imdb.com/title/" + response.data.imdbID
              );
              movieObject.set(
                "Watched",
                document.getElementById("watchedCheckBox").checked
              );

              movieObject.save().then(
                (result) => {},
                (error) => {
                  if (typeof document !== "undefined")
                    console.error("Error while creating ParseObject: ", error);
                }
              );

              // Success notification
              sendNotification(
                document.querySelector(".notification-success"),
                `Movie '${response.data.Title}' Successfully added to the database!`
              );
            }
          } else {
            sendNotification(
              document.querySelector(".notification-fail"),
              `Movie '${response.data.Title}' already exists on the database.`
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If input value is empty
      sendNotification(
        document.querySelector(".notification-fail"),
        "You have to enter a valid movie name!"
      );
    }
  };

  return (
    <div className="App">
      <div className="notification-success"></div>
      <div className="notification-fail"></div>
      <h1>Movie Tracker Project</h1>
      <div className="save-movie-section">
        <input type="text" placeholder="Movie Name" id="movieNameInput" />
        <br />
        <label htmlFor="watchedCheckBox">Have you watched it?</label>
        <input type="checkbox" name="watched" id="watchedCheckBox" />
        <br />
        <button className="submitBtn" onClick={handleClick}>
          Save Movie
        </button>
      </div>
      <Recommendation />
    </div>
  );
};

export default Home;

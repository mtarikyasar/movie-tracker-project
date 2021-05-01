import "./App.css";
import { useState, useEffect } from "react";
import env from "react-dotenv";

const axios = require("axios");
const Parse = require("parse");

function App() {
  Parse.serverURL = "https://parseapi.back4app.com";
  Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
  const [movieName, setMovieName] = useState("empty");

  const handeClick = () => {
    const MyTestClass = Parse.Object.extend("MyTestClass");
    const myNewObject = new MyTestClass();

    myNewObject.set("myCustomKey1Name", "myCustomKey1Value");

    myNewObject.save().then(
      (result) => {
        if (typeof document !== "undefined")
          console.log("ParseObject created", result);
      },
      (error) => {
        if (typeof document !== "undefined")
          console.error("Error while creating ParseObject: ", error);
      }
    );

    setMovieName(document.getElementById("movieNameInput").value);

    if (movieName !== "empty" && movieName !== "") {
      axios
        .get(
          "http://www.omdbapi.com/?t=" +
            movieName +
            "&apikey=" +
            env.OMDB_API_KEY
        )
        .then((response) => {
          console.log(response.data);
          alert(`Movie ${movieName} added. Please refresh the page.`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="App">
      <h1>Movie Tracker</h1>
      <marquee behavior="" direction="right">
        <header className="App-header">Last added Movie: {movieName}</header>
      </marquee>

      <input type="text" placeholder="Movie Name" id="movieNameInput" />
      <button
        className="submitBtn"
        onClick={() => {
          handeClick();
        }}
      >
        Save Movie
      </button>
      <p>{movieName}</p>
    </div>
  );
}

export default App;

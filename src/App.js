import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import { useState } from "react";
import MoviesPage from "./components/MoviesPage";

import env from "react-dotenv";
const Parse = require("parse");

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
const query = new Parse.Query("Movies");

async function getMovies() {
  const parseResults = await query.find();

  let titleList = [];
  let posterList = [];
  let watchList = [];
  let imdbLinkList = [];

  parseResults.forEach((element) => {
    titleList.push(element.attributes.Title);
    // Adding whitespace to split afterwards
    // Because map function doesn't accept objects
    posterList.push(
      element.attributes.Poster +
        " " +
        element.attributes.imdbLink +
        " " +
        element.attributes.Watched
    );
    watchList.push(element.attributes.Watched);
    imdbLinkList.push(element.attributes.imdbLink);
  });

  let Movies = {
    titles: [],
    posters: [],
    watchlist: [],
    imdbLinks: [],
  };

  Movies.titles = titleList;
  Movies.posters = posterList;
  Movies.watchlist = watchList;
  Movies.imdbLinks = imdbLinkList;

  return Movies;
}

function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="App">
      <Navbar setStep={setStep} />
      {step === 0 ? <Home /> : <MoviesPage moviesList={getMovies()} />}
      {/* <p>Step: {step}</p> */}
    </div>
  );
}

export default App;

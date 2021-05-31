import "./App.css";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import WatchlistPage from "./pages/WatchlistPage";
import MovieDetailPage from "./pages/MovieDetailPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    let splitValue = "#split#here#";
    posterList.push(
      element.attributes.Poster +
        splitValue +
        element.attributes.imdbLink +
        splitValue +
        element.attributes.Watched +
        splitValue +
        element.attributes.Title
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
  const changeLightingMode = () => {
    if (localStorage.getItem("theme") === "theme-light") {
      localStorage.setItem("theme", "theme-dark");
      document.documentElement.className = "theme-dark";
    } else {
      localStorage.setItem("theme", "theme-light");
      document.documentElement.className = "theme-light";
    }
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar links">
          <div className="navigation-links">
            <button>
              <Link to="">Home</Link>
            </button>
            <button>
              <Link to="/movies">Movies</Link>
            </button>
            <button>
              <Link to="/watchlist">Watchlist</Link>
            </button>
          </div>
          <button className="change-mode" onClick={changeLightingMode}>
            <i className="fas fa-moon"></i>
          </button>
        </nav>

        <Switch>
          <Route path="/movies">
            <MoviesPage moviesList={getMovies()} />
          </Route>
          <Route path="/watchlist">
            <WatchlistPage />
          </Route>
          <Route path="/moviedetails">
            <MovieDetailPage />
          </Route>
          <Route path="">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

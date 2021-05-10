import "./App.css";
import HomePage from "./components/HomePage";
import MoviesPage from "./components/MoviesPage";
import WatchlistPage from "./components/WatchlistPage";

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
  return (
    <Router>
      <div className="App">
        <nav className="navbar links">
          <button>
            <Link to="">Home</Link>
          </button>
          <button>
            <Link to="/movies">Movies</Link>
          </button>
          <button>
            <Link to="/watchlist">Watchlist</Link>
          </button>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/movies">
            <MoviesPage moviesList={getMovies()} />
          </Route>
          <Route path="/watchlist">
            <WatchlistPage />
          </Route>
          <Route path="">
            <HomePage />
          </Route>
        </Switch>
      </div>

      <footer className="bottom-bar">
        <a
          href="https://github.com/mtarikyasar"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github" />
        </a>
      </footer>
    </Router>

    // <div className="App">
    //   <Navbar setStep={setStep} />
    //   {step === 0 ? <Home /> : <MoviesPage moviesList={getMovies()} />}
    //   <nav className="bottom-bar">
    //     <a
    //       href="https://github.com/mtarikyasar"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <i className="fab fa-github" />
    //     </a>
    //   </nav>
    // </div>
  );
}

export default App;

import "./App.css";
import Home from "./components/Home";

import MoviesPage from "./components/MoviesPage";
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
        </nav>
        <nav className="bottom-bar">
          <a
            href="https://github.com/mtarikyasar"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github" />
          </a>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/movies">
            <MoviesPage moviesList={getMovies()} />
          </Route>
          <Route path="">
            <Home />
          </Route>
        </Switch>
      </div>
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

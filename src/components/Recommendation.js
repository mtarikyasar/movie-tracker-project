import env from "react-dotenv";
import UnwatchedMovies from "./UnwatchedMovies";
import "../componentStyles/Recommendation.css";

const Parse = require("parse");

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
const query = new Parse.Query("Movies");

const Recommendation = () => {
  const getRandomUnwatchedMovie = async () => {
    query.equalTo("Watched", false);
    const tempResults = await query.find();
    let results = [];
    let randomNumberArray = [];

    while (results.length < 4) {
      let randomNumber = Math.floor(Math.random() * tempResults.length);
      if (randomNumberArray.indexOf(randomNumber) === -1) {
        randomNumberArray.push(randomNumber);
        results.push(tempResults[randomNumber]);
      }
    }

    return results;
  };

  return (
    <div className="recommendation-section">
      <h2>Haven't you watched yet?</h2>
      <UnwatchedMovies moviesPromise={getRandomUnwatchedMovie()} />
    </div>
  );
};

export default Recommendation;

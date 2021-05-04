import env from "react-dotenv";
import RandomMovie from "./RandomMovie";
import "../componentStyles/Recommendation.css";

const Parse = require("parse");

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
const query = new Parse.Query("Movies");

const Recommendation = () => {
  const getRandomUnwatchedMovie = async () => {
    query.equalTo("Watched", false);
    const results = await query.find();

    let randomNumber = Math.floor(Math.random() * results.length);

    return results[randomNumber].attributes;
  };

  return (
    <div className="recommendation-section">
      <h2>Haven't you watched it yet?</h2>
      <RandomMovie movieNamePromise={getRandomUnwatchedMovie()} />
    </div>
  );
};

export default Recommendation;

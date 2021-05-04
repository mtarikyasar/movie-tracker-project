import env from "react-dotenv";
import SlidingText from "./SlidingText";

const Parse = require("parse");

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
const query = new Parse.Query("Movies");

const Recommendation = () => {
  const getRandomUnwatchedMovie = async () => {
    query.equalTo("Watched", false);
    const results = await query.find();

    return results[Math.floor(Math.random() * results.length)].attributes;
  };

  return (
    <div>
      <SlidingText movieNamePromise={getRandomUnwatchedMovie()} />
    </div>
  );
};

export default Recommendation;

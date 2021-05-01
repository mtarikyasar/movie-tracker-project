import { useState } from "react";
import env from "react-dotenv";
const Parse = require("parse");

const Movies = () => {
  const [movieList, setMovieList] = useState();

  const renderMovies = async () => {
    Parse.serverURL = "https://parseapi.back4app.com";
    Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
    const query = new Parse.Query("Movies");

    const parseResults = await query.find();
    setMovieList(parseResults);

    parseResults.then((response) => {
      console.log(response);

      return (
        <div>
          <p>{response[0].attributes.MovieName}</p>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Movies</h1>
    </div>
  );
};

export default Movies;

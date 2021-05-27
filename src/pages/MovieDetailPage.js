import { useLocation } from "react-router";
import env from "react-dotenv";
import { useState } from "react";
const axios = require("axios");

const MovieDetailPage = () => {
  const [movie, setMovie] = useState();
  const location = useLocation();
  const { name } = location.state;

  const renderMovie = () => {
    axios
      .get("http://www.omdbapi.com/?t=" + name + "&apikey=" + env.OMDB_API_KEY)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(name);

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default MovieDetailPage;

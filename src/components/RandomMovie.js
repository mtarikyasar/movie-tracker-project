import { useState } from "react";
import "../componentStyles/RandomMovie.css";
import Movie from "./Movie";

const RandomMovie = ({ movieNamePromise }) => {
  const [movieName, setMovieName] = useState("");
  const [imdbLink, setImdbLink] = useState("");
  const [posterLink, setPosterLink] = useState("");

  movieNamePromise.then((res) => {
    setImdbLink(res.imdbLink);
    setMovieName(res.Title);
    setPosterLink(res.Poster);
  });

  return (
    <div>
      <h2>{movieName}</h2>
      <Movie poster={posterLink} imdbLink={imdbLink} />
    </div>
  );
};

export default RandomMovie;

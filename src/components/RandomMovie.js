import { useState } from "react";
import "../componentStyles/RandomMovie.css";
import Movie from "./Movie";

const RandomMovie = ({ movieNamePromise }) => {
  const [movieName, setMovieName] = useState("");
  const [imdbLink, setImdbLink] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [posterLink, setPosterLink] = useState("");
  const [plot, setPlot] = useState("");

  movieNamePromise.then((res) => {
    setImdbLink(res.imdbLink);
    setMovieName(res.Title);
    setImdbRating(res.imdbRating);
    setPosterLink(res.Poster);
    setPlot(res.Plot);
  });

  return (
    <div className="random-movie-section">
      <h3>{movieName}</h3>
      <div className="poster-plot">
        <Movie
          poster={posterLink}
          imdbLink={imdbLink}
          className="movie-poster"
        />
        <p>
          {plot}
          <p>IMDB Rating: {imdbRating}</p>
        </p>
      </div>
    </div>
  );
};

export default RandomMovie;

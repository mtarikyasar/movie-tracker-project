import { useState, useEffect } from "react";
import "../componentStyles/MoviesPage.css";
import Movie from "./Movie";
import LoadingAnimation from "./LoadingAnimation";

const MoviesPage = ({ moviesList }) => {
  const [posterAndLink, setposterAndLink] = useState([]);
  const [isPending, setIsPending] = useState(true);

  const renderMovies = (e) => {
    let res = e.split(" ");
    return <Movie poster={res[0]} imdbLink={res[1]} watched={res[2]} />;
  };

  useEffect(() => {
    moviesList.then((resp) => {
      setposterAndLink(resp.posters);
      setIsPending(false);
    });
  });

  return (
    <div>
      <div className="movies">
        <h1>Movies</h1>
      </div>

      {isPending && <LoadingAnimation />}
      <div className="movies-section">
        {posterAndLink.map((e) => renderMovies(e))}
      </div>
    </div>
  );
};

export default MoviesPage;

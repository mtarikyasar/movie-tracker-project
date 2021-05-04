import { useState } from "react";
import "../componentStyles/MoviesPage.css";
import Movie from "./Movie";

const MoviesPage = ({ moviesList }) => {
  const [posterAndLink, setposterAndLink] = useState([]);

  moviesList.then((resp) => {
    setposterAndLink(resp.posters);
  });

  const testFunction = (e) => {
    let res = e.split(" ");
    return <Movie poster={res[0]} imdbLink={res[1]} watched={res[2]} />;
  };

  return (
    <div>
      <div className="movies">
        <h1>Movies</h1>
      </div>
      <div className="movies-section">
        {posterAndLink.map((e) => testFunction(e))}
      </div>
    </div>
  );
};

export default MoviesPage;

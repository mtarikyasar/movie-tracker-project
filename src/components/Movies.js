import { useState } from "react";
import "../componentStyles/Movies.css";

const Movies = ({ moviesList }) => {
  const [movie, setMovie] = useState([]);

  moviesList.then((resp) => {
    setMovie(resp);
  });

  return (
    <div>
      <div className="movies">
        <h1>Movies</h1>
      </div>
      <div className="movies-section">
        {movie.map((e) => (
          <img src={e} alt="" key={e + 1} />
        ))}
      </div>
    </div>
  );
};

export default Movies;

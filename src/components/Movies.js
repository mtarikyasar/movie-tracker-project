import { useState } from "react";
import "../componentStyles/Movies.css";

const Movies = ({ moviesList }) => {
  const [movie, setMovie] = useState([]);

  moviesList.then((resp) => {
    setMovie(resp);
  });

  return (
    <div>
      <h1>Movies</h1>
      {movie.map((e) => (
        <img src={e} alt="" key={e + 1} />
      ))}
    </div>
  );
};

export default Movies;

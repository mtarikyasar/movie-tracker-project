import { useState } from "react";
import "../componentStyles/Movies.css";

const Movies = ({ moviesList }) => {
  const [posterAndLink, setposterAndLink] = useState([]);

  moviesList.then((resp) => {
    setposterAndLink(resp.posters);
  });

  const testFunction = (e) => {
    let res = e.split(" ");
    return (
      <a href={res[1]} target="_blank" rel="noreferrer" key={res[1]}>
        <img src={res[0]} alt="" key={res[0] + 1} className={res[2]} />
      </a>
    );
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

export default Movies;

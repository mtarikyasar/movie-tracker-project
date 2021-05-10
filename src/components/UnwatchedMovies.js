import { useEffect, useState } from "react";
import "../componentStyles/UnwatchedMovies.css";
import LoadingAnimation from "./LoadingAnimation";

const UnwatchedMovies = ({ moviesPromise }) => {
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    moviesPromise.then((res) => {
      let div = document.querySelector(".unwatched-movie-section");

      // To prevent from rendering twice
      if (div) {
        div.innerHTML = "";

        res.forEach((element) => {
          let movieDiv = document.createElement("div");
          movieDiv.className = "movie-div";

          let plot = document.createElement("p");
          plot.innerHTML = element.attributes.Plot;
          plot.className = "plot";

          let imdbRating = document.createElement("p");
          imdbRating.className = "rating";
          imdbRating.innerHTML = element.attributes.imdbRating;

          let imdbLogo = document.createElement("i");
          imdbLogo.className = "fab fa-imdb";

          let imdbLink = document.createElement("a");
          imdbLink.href = element.attributes.imdbLink;
          imdbLink.target = "_blank";
          imdbLink.rel = "noreferrer";
          imdbLink.key = element.attributes.imdbLink;

          let poster = document.createElement("img");
          poster.src = element.attributes.Poster;

          let movieInformation = document.createElement("div");
          movieInformation.className = "movie-information";

          imdbRating.appendChild(imdbLogo);

          movieInformation.appendChild(plot);
          movieInformation.appendChild(imdbRating);

          imdbLink.appendChild(poster);
          movieDiv.appendChild(movieInformation);
          movieDiv.appendChild(imdbLink);
          div.appendChild(movieDiv);
        });
      }

      setIsPending(false);
    });
  });

  return (
    <div>
      {isPending && <LoadingAnimation />}
      <div className="unwatched-movie-section"></div>
    </div>
  );
};

export default UnwatchedMovies;

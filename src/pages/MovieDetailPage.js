import { useLocation } from "react-router";
import env from "react-dotenv";
import { useEffect, useState } from "react";
import "../componentStyles/MovieDetailPage.css";
import LoadingAnimation from "../components/LoadingAnimation";

const axios = require("axios");

const MovieDetailPage = () => {
  const [isPending, setIsPending] = useState(true);
  const location = useLocation();
  const { name, watched } = location.state;

  useEffect(() => {
    axios
      .get("http://www.omdbapi.com/?t=" + name + "&apikey=" + env.OMDB_API_KEY)
      .then((response) => {
        console.log(response.data);
        let movieDetails = document.querySelector(".movie-detail");

        if (movieDetails.innerHTML) {
          movieDetails.innerHTML = "";
        }

        let leftDiv = document.createElement("div");
        leftDiv.className = "left-div";

        let rightDiv = document.createElement("div");
        rightDiv.className = "right-div";

        let movieTitle = document.createElement("h1");
        movieTitle.innerHTML = response.data.Title;
        movieTitle.className = "title";

        let director = document.createElement("p");
        director.innerHTML = `Director: ${response.data.Director}`;
        director.className = "director bottom-line";

        let imdbLink = document.createElement("a");
        imdbLink.href = `https://www.imdb.com/title/${response.data.imdbID}`;
        imdbLink.className = "imdb-link";
        imdbLink.innerHTML = "IMDB Page";
        imdbLink.target = "_blank";
        imdbLink.rel = "noreferrer";

        let writer = document.createElement("p");
        writer.innerHTML = `Writer: ${response.data.Writer}`;
        writer.className = "writer bottom-line";

        let plot = document.createElement("p");
        plot.innerHTML = `${response.data.Plot}`;
        plot.className = "plot";

        let boxOffice = document.createElement("p");
        boxOffice.innerHTML = `Box Office: ${response.data.BoxOffice}`;
        boxOffice.className = "box-office bottom-line";

        let imdbRating = document.createElement("p");
        imdbRating.innerHTML = `IMDB Rating: ${response.data.imdbRating}`;
        imdbRating.className = "imdb-rating bottom-line";

        let poster = document.createElement("img");
        poster.src = response.data.Poster;
        poster.className = "poster";

        let runtime = document.createElement("p");
        runtime.innerHTML = `Runtime: ${response.data.Runtime}`;
        runtime.className = "runtime bottom-line";

        let releaseDate = document.createElement("p");
        releaseDate.innerHTML = `Release Date: ${response.data.Released}`;
        releaseDate.className = "release-date bottom-line";

        let genres = document.createElement("p");
        genres.innerHTML = `Genres: ${response.data.Genre}`;
        genres.className = "genres bottom-line";

        let watchedSit = document.createElement("p");
        watchedSit.innerHTML = watched
          ? "You have watched this movie."
          : "You haven't watched this movie.";
        watchedSit.className = "watched-situation";

        leftDiv.appendChild(movieTitle);
        leftDiv.appendChild(poster);
        leftDiv.appendChild(imdbLink);
        rightDiv.appendChild(plot);
        rightDiv.appendChild(director);
        rightDiv.appendChild(writer);
        rightDiv.appendChild(boxOffice);
        rightDiv.appendChild(imdbRating);
        rightDiv.appendChild(genres);
        rightDiv.appendChild(runtime);
        rightDiv.appendChild(releaseDate);
        rightDiv.appendChild(watchedSit);

        movieDetails.appendChild(leftDiv);
        movieDetails.appendChild(rightDiv);

        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return (
      <div>
        <h2>Hello There</h2>
      </div>
    );
  });

  return (
    <div>
      {isPending && <LoadingAnimation />}
      <div className="movie-detail"></div>
    </div>
  );
};

export default MovieDetailPage;

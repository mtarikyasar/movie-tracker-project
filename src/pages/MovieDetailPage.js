import { useLocation } from "react-router";
import env from "react-dotenv";
import { useEffect, useState } from "react";
import "../componentStyles/MovieDetailPage.css";
import LoadingAnimation from "../components/LoadingAnimation";

const axios = require("axios");

const MovieDetailPage = () => {
  const [isPending, setIsPending] = useState(true);
  const location = useLocation();
  const { name } = location.state;

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

        leftDiv.appendChild(movieTitle);
        leftDiv.appendChild(poster);
        rightDiv.appendChild(plot);
        rightDiv.appendChild(director);
        rightDiv.appendChild(writer);
        rightDiv.appendChild(boxOffice);
        rightDiv.appendChild(imdbRating);
        rightDiv.appendChild(genres);
        rightDiv.appendChild(runtime);
        rightDiv.appendChild(releaseDate);

        movieDetails.appendChild(leftDiv);
        movieDetails.appendChild(rightDiv);

        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      {isPending && <LoadingAnimation />}
      <div className="movie-detail"></div>
    </div>
  );
};

export default MovieDetailPage;

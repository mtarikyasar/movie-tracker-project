import { useState } from "react";
import "../componentStyles/SlidingText.css";

const SlidingText = ({ movieNamePromise }) => {
  const [movieName, setMovieName] = useState("");
  const [imdbLink, setImdbLink] = useState("");

  movieNamePromise.then((res) => {
    setImdbLink(res.imdbLink);
    setMovieName(res.Title);
  });
  return (
    <div>
      <h3 className="slide-left">
        Would you like to watch this movie today:{" "}
        <a href={imdbLink}>{movieName}</a>
      </h3>
    </div>
  );
};

export default SlidingText;

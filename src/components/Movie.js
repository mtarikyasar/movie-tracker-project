const Movie = ({ poster, imdbLink, watched }) => {
  return (
    <a
      href={imdbLink}
      target="_blank"
      rel="noreferrer"
      key={imdbLink}
      className={watched}
    >
      <img src={poster} alt="" key={poster + 1} />
    </a>
  );
};

export default Movie;

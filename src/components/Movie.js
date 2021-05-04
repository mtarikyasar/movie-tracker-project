const Movie = ({ poster, imdbLink, watched }) => {
  return (
    <a href={imdbLink} target="_blank" rel="noreferrer" key={imdbLink}>
      <img src={poster} alt="" key={poster + 1} className={watched} />
    </a>
  );
};

export default Movie;

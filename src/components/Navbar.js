import "../componentStyles/Navbar.css";

const Navbar = ({ setStep }) => {
  return (
    <nav className="navbar">
      <div className="links">
        <div className="movie-wheel">
          <div className="top left"></div>
          <div className="top right"></div>
          <div className="bottom left"></div>
          <div className="bottom right"></div>
        </div>
        <div className="navigation">
          <button onClick={() => setStep(0)}>Home</button>
          <button onClick={() => setStep(1)}>Movies</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const Navbar = ({ setStep }) => {
  return (
    <nav className="navbar">
      <div className="links">
        <button onClick={() => setStep(0)}>Home</button>
        <button onClick={() => setStep(1)}>Movies</button>
      </div>
      <h1>Movie Tracker</h1>
    </nav>
  );
};

export default Navbar;

import "../componentStyles/Navbar.css";

const Navbar = ({ setStep }) => {
  return (
    <nav className="navbar">
      <div className="links">
        <button onClick={() => setStep(0)}>Home</button>
        <button onClick={() => setStep(1)}>Movies</button>
      </div>
    </nav>
  );
};

export default Navbar;

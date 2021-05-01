import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useState } from "react";
import Movies from "./components/Movies";

function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="App">
      <Navbar setStep={setStep} />
      {step === 0 ? <Home /> : <Movies />}
      <p>Step: {step}</p>
    </div>
  );
}

export default App;

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { useState } from "react";
import Movies from "./components/Movies";

import env from "react-dotenv";
const Parse = require("parse");

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(env.PARSE_APP_ID, env.PARSE_JS_KEY, env.PARSE_MASTER_KEY);
const query = new Parse.Query("Movies");

async function getMovieList() {
  const parseResults = await query.find();
  let posterList = [];
  parseResults.forEach((element) => {
    posterList.push(element.attributes.Poster);
  });

  return posterList;
}

function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="App">
      <Navbar setStep={setStep} />
      {step === 0 ? <Home /> : <Movies moviesList={getMovieList()} />}
      {/* <p>Step: {step}</p> */}
    </div>
  );
}

export default App;

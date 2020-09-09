import React, { useState } from "react";
import "./App.css";
import questionnaire from "./utils/questionnaire";
import Landing from "./components/Landing";
import Question from "./components/Question";
import Result from "./components/Result";

const QUESTIONS_LENGTH = questionnaire.length;
const initialState = {
  E: 0,
  I: 0,
  N: 0,
  S: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
};
const App = () => {
  const [score, setScore] = useState(initialState);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);

  const startTest = () => {
    setScore(initialState);
    setIndex(0);
    setStart(true);
  };

  return (
    <div>
      {!start ? (
        <Landing />
      ) : index === QUESTIONS_LENGTH - 1 ? (
        <Result />
      ) : (
        <Question />
      )}
    </div>
  );
};

export default App;

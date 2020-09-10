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

  const refreshPage = () => {
    setScore(initialState);
    setIndex(0);
    setStart(false);
  };

  const handleAnswer = (type) => {
    setScore({
      ...score,
      [type]: score[type] + 1,
    });
    setIndex(index + 1);
  };

  const calcResult = () => {
    let str = "";
    str += score.E > score.I ? "E" : "I";
    str += score.N > score.S ? "N" : "S";
    str += score.T > score.F ? "T" : "F";
    str += score.J > score.P ? "J" : "P";
    return str;
  };

  return (
    <div>
      {!start ? (
        <Landing startTest={startTest} />
      ) : index === QUESTIONS_LENGTH ? (
        <Result
          calcResult={calcResult}
          startTest={startTest}
          refreshPage={refreshPage}
        />
      ) : (
        <Question index={index} handleAnswer={handleAnswer} />
      )}
    </div>
  );
};

export default App;

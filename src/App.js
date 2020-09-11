import React, { useState } from "react";
import questionnaire from "./utils/questionnaire";
import Landing from "./components/Landing";
import Question from "./components/Question";
import Result from "./components/Result";
import styled, { createGlobalStyle } from "styled-components";
import ReactHowler from "react-howler";
import Playlist from "./components/Playlist";

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
    font-family: "Noto Sans KR", sans-serif;

    background-color: #af8c9d;
    background-image: linear-gradient(315deg, #af8c9d 0%, #8cacac 74%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    margin: 50px;
    padding: 50px;
  }
`;

const Container = styled.div`
  max-width: 1024px;
  width: 90%;
  margin: 0 auto;
`;

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
  // const [play, { stop, isPlaying, sound }] = useSound(
  //   questionnaire[index].music,
  //   {
  //     volume: 0.5,
  //     interrupt: true,
  //   }
  // );

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
    <Container>
      <GlobalStyle />
      <ReactHowler preload={true} src={Playlist[index]} playing={true} />
      {/* <button onClick={(e) => stop()}>
        {isPlaying ? "Mute" : "Not playing"}
      </button> */}
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
    </Container>
  );
};

export default App;

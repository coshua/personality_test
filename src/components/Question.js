import React, { useState } from "react";
import questionnaire from "../utils/questionnaire";
import styled, { keyframes, css } from "styled-components";
import { darken } from "polished";

const fadeOut = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
`;

const fadeIn = keyframes`
0% {
  opacity: 0
}
100% {
  opacity: 1
}`;

const Container = styled.div`
  box-sizing: border-box;
  width: 80%;
  text-align: center;
`;

const QuestionContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const QuestionSpan = styled.span`
  ${(props) =>
    props.animate === "fadeOut" &&
    css`
      animation: ${fadeOut} 1s ease-in-out forwards;
    `}
  ${(props) =>
    props.animate === "fadeIn" &&
    css`
      opacity: 0;
      animation: ${fadeIn} 5s ${props.stagger}ms forwards;
    `}
    ${(props) =>
    props.animate === "fade" &&
    css`
      animation: ${fadeIn} 1s ease-in-out;
    `}
`;

const Button = styled.button`
  color: inherit;
  display: inline-block;
  outline: none;
  border-radius: 8px;
  border: 1px solid transparent;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  width: 70%;
  padding: 1.2rem 1rem;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition: border-color 1s;
  ${(props) =>
    props.animate === "fadeOutDelay" &&
    css`
      animation: ${fadeOut} 1s ease-in-out 1s forwards;
    `}
  ${(props) =>
    props.animate === "fadeOut" &&
    css`
      animation: ${fadeOut} 1s ease-in-out forwards;
    `}
    ${(props) =>
    props.animate === "fadeIn" &&
    css`
      opacity: 0;
      animation: ${fadeIn} 1s ease-in-out ${props.delay}ms forwards;
    `}
  &:hover {
    border: 1px solid ${darken(0.3, "#FFF")};
  }
  &:active {
    border: 1px solid ${darken(0.3, "#FFF")};
    background-color: rgba(0, 0, 0, 0.3);
  }
  & + & {
    margin-top: 2rem;
  }
  @media only screen and (min-width: 600px) {
    width: 40%;
    & + & {
      margin-left: 10%;
      margin-top: 2.5rem;
    }
  }
`;

const Question = ({
  handleAnswer,
  handleVideo,
  index,
  setIndex,
  handleBackground,
}) => {
  const [variation, setVariation] = useState(-1); //0 question for P,1 requires question for J
  const [animation, setAnimation] = useState({
    question: "fadeIn",
    response: ["fadeIn", "fadeIn"],
  });

  const spanGenerator = (string, animate = "fadeInStagger") => {
    var split = string.split("");
    return split.map((char, index) => (
      <QuestionSpan
        animate={animation.question}
        index={index}
        stagger={index * 100}
        className="letter"
      >
        {char}
      </QuestionSpan>
    ));
  };
  const handleClick = (v) => {
    if (variation === -1) {
      handleAnswer(questionnaire[index].response[v].type);
      if (questionnaire[index].response[v].hasOwnProperty("subquestion")) {
        setVariation(v);
        setAnimation({ question: "fadeIn", response: ["fadeIn", "fadeIn"] });
      } else {
        setIndex(index + 1);
        setAnimation({ question: "fadeIn", response: ["fadeIn", "fadeIn"] });
      }
    } else {
      handleAnswer(
        questionnaire[index].response[variation].subresponse[v].type
      );
      setVariation(-1);
      setIndex(index + 1);
      setAnimation({ question: "fadeIn", response: ["fadeIn", "fadeIn"] });
    }
  };

  return (
    <Container>
      <QuestionContainer>
        {variation === -1
          ? spanGenerator(questionnaire[index].question)
          : spanGenerator(questionnaire[index].response[variation].subquestion)}
      </QuestionContainer>

      <Button
        animate={animation.response[0]}
        delay={
          variation === -1
            ? questionnaire[index].question.length * 100
            : questionnaire[index].response[variation].subquestion.length * 100
        }
        onClick={(e) => {
          handleBackground(0);
          setAnimation({
            question: "fadeOut",
            response: ["fadeOutDelay", "fadeOut"],
          });
          setTimeout(() => handleClick(0), 2000);
        }}
      >
        {variation === -1
          ? questionnaire[index].response[0].answer
          : questionnaire[index].response[variation].subresponse[0].answer}
      </Button>

      <Button
        animate={animation.response[1]}
        delay={
          variation === -1
            ? questionnaire[index].question.length * 100
            : questionnaire[index].response[variation].subquestion.length * 100
        }
        onClick={(e) => {
          handleBackground(1);
          setAnimation({
            question: "fadeOut",
            response: ["fadeOut", "fadeOutDelay"],
          });
          setTimeout(() => handleClick(1), 2000);
        }}
      >
        {variation === -1
          ? questionnaire[index].response[1].answer
          : questionnaire[index].response[variation].subresponse[1].answer}
      </Button>
    </Container>
  );
};

export default Question;

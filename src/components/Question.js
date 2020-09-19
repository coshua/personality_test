import React, { useState } from "react";
import questionnaire from "../utils/questionnaire";
import styled from "styled-components";
import { darken } from "polished";
import ReactAnime from "react-animejs";
import { spanGenerator } from "../utils/utilFunctions";
const { Anime, stagger } = ReactAnime;

const Container = styled.div`
  box-sizing: border-box;
  width: 80%;
  text-align: center;
`;

const QuestionContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Button = styled.button`
  display: inline-block;
  outline: none;
  border-radius: 8px;
  border: 1px solid transparent;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  overflow: hidden;
  width: 70%;
  padding: 1.2rem 1rem;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
  transition: border-color 1s;
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

  const handleClick = (v) => {
    if (variation === -1) {
      handleAnswer(questionnaire[index].response[v].type);
      if (questionnaire[index].response[v].hasOwnProperty("subquestion")) {
        setVariation(v);
      } else {
        setIndex(index + 1);
      }
    } else {
      console.log(questionnaire[index].response[variation].subresponse[v].type);
      handleAnswer(
        questionnaire[index].response[variation].subresponse[v].type
      );
      setVariation(-1);
      setIndex(index + 1);
    }
  };

  return (
    <Container>
      <QuestionContainer>
        <Anime
          initial={[
            {
              targets: ".letter",
              opacity: [0, 1],
              easing: "easeInOutQuad",
              delay: stagger(100, { start: 3000 }),
            },
          ]}
          _onUpdate={[
            {
              targets: ".letter",
              opacity: [1, 0],
              duration: 500,
              endDelay: 500,
            },
            {
              targets: ".letter",
              opacity: [0, 1],
              easing: "easeInOutQuad",
              delay: stagger(100),
            },
          ]}
        >
          <span id="question">
            {variation === -1
              ? spanGenerator(questionnaire[index].question)
              : spanGenerator(
                  questionnaire[index].response[variation].subquestion
                )}
          </span>
        </Anime>
      </QuestionContainer>
      <Anime
        type="span"
        initial={[
          {
            targets: "#button",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            delay: stagger(100, { start: 1000 }),
          },
        ]}
      >
        <Button
          id="button"
          onClick={(e) => {
            handleBackground(0);
            handleClick(0);
          }}
        >
          {variation === -1
            ? questionnaire[index].response[0].answer
            : questionnaire[index].response[variation].subresponse[0].answer}
        </Button>
      </Anime>
      <Anime
        type="span"
        initial={[
          {
            targets: "#animation .letter",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            delay: stagger(100, { start: 3000 }),
          },
        ]}
      >
        <Button
          onClick={(e) => {
            handleBackground(1);
            handleClick(1);
          }}
        >
          {variation === -1
            ? questionnaire[index].response[1].answer
            : questionnaire[index].response[variation].subresponse[1].answer}
        </Button>
      </Anime>
    </Container>
  );
};

export default Question;

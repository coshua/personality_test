import React from "react";
import questionnaire from "../utils/questionnaire";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 20vh;
  margin: 2rem;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 20vh;
  margin: 2rem;
`;

const Button = styled.button`
  display: inline-block;
  border-radius: 6px;
  width: 80%;
  padding: 0.5rem 0;
  font-family: inherit;
  text-align: center;
  & + & {
    margin-top: 2.5rem;
  }
`;

const Question = ({ handleAnswer, index }) => {
  return (
    <>
      <Container>{questionnaire[index].question}</Container>
      <QuestionContainer>
        <Button
          onClick={(e) => {
            handleAnswer(questionnaire[index].response[0].type);
          }}
        >
          {questionnaire[index].response[0].answer}
        </Button>
        <Button
          onClick={(e) => {
            handleAnswer(questionnaire[index].response[1].type);
          }}
        >
          {questionnaire[index].response[1].answer}
        </Button>
      </QuestionContainer>
    </>
  );
};

export default Question;

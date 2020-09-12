import React from "react";
import questionnaire from "../utils/questionnaire";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  text-align: center;
  min-width: 80vh;
`;

const QuestionContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Button = styled.button`
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  width: 40%;
  padding: 0.5rem 0;
  font-family: inherit;
  text-align: center;
  & + & {
    margin-left: 10%;
    margin-top: 2.5rem;
  }
`;

const Question = ({ handleAnswer, index }) => {
  return (
    <Container>
      <QuestionContainer>{questionnaire[index].question}</QuestionContainer>
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
    </Container>
  );
};

export default Question;

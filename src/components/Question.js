import React from "react";
import questionnaire from "../utils/questionnaire";

const Question = ({ handleAnswer, index }) => {
  return (
    <>
      <div className="question">{questionnaire[index].question}</div>
      <div className="response">
        <button
          onClick={(e) => {
            handleAnswer(questionnaire[index].response[0].type);
          }}
        >
          {questionnaire[index].response[0].answer}
        </button>
        <button
          onClick={(e) => {
            console.log(questionnaire[index].response[1].type);
            handleAnswer(questionnaire[index].response[1].type);
          }}
        >
          {questionnaire[index].response[1].answer}
        </button>
      </div>
    </>
  );
};

export default Question;

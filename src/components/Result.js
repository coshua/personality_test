import React from "react";
import PropTypes from "prop-types";

const Result = ({ content }) => {
  return (
    <>
      <div className="result-main"></div>
      <div className="control"></div>
      <div className="share"></div>
    </>
    //SNS로 공유하기
  );
};

Result.propTypes = {
  content: PropTypes.object.isRequired, //solid constructure
};

export default Result;

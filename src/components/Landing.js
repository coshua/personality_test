import React from "react";
import "./Landing.css";

const Landing = ({ startTest }) => {
  return (
    <>
      <div>Contents</div>
      <div className="control">
        <button onClick={(e) => startTest()}>시작하기</button>
      </div>
    </>
  );
};

export default Landing;

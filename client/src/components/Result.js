import React from "react";

const Result = ({ calcResult, refreshPage, startTest }) => {
  const TYPE = calcResult();

  /*   const summaryResult = () => {
    var str = "에너지를 얻는 방향\n";
    str += TYPE.includes("E") ? "Extraversion" : "Introversion";
  }; */
  return (
    <>
      <div className="result-main"></div>
      {TYPE}
      <div className="control"></div>
      <button onClick={(e) => refreshPage()}>처음으로</button>
      <button onClick={(e) => startTest()}>다시하기</button>
      <div className="share"></div>
    </>
    //SNS로 공유하기
  );
};

Result.propTypes = {
  //solid constructure
};

export default Result;

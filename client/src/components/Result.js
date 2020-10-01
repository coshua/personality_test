import React, { useState, useEffect } from "react";
import axios from "axios";
import Statistics from "./Statistics";

const Result = ({ answer, calcResult, refreshPage, startTest }) => {
  const [stat, setStat] = useState({});
  const TYPE = calcResult();

  const sendData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      response: answer,
      category: TYPE,
    };
    return axios.post("/api/result", data, config);
  };

  useEffect(() => {
    sendData().then(
      async () => {
        try {
          const res = await axios.get("/api/result");
          if (res.data.length > 0) {
            const labels = [];
            const acc = [];
            for (let [key, value] of Object.entries(res.data[0])) {
              labels.push(key);
              acc.push(value);
            }
            setStat({
              labels: labels,
              acc: acc,
            });
          }
        } catch (err) {
          throw err;
        }
      },
      (err) => {
        throw err;
      }
    );
  }, []);

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
      {stat.hasOwnProperty("labels") ? <Statistics data={stat} /> : ""}
    </>
    //SNS로 공유하기
  );
};

Result.propTypes = {
  //solid constructure
};

export default Result;

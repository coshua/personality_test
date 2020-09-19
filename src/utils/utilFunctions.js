import React from "react"; //needed?

export const spanGenerator = (string) => {
  var split = string.split("");
  var result = split.map((char) => <span className="letter">{char}</span>);
  return result;
};

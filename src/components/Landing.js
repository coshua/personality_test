import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  text-align: center;
`;

const Landing = ({ startTest }) => {
  return (
    <Container>
      당신의 내면에 귀 기울어보세요
      <div className="control">
        <Button
          onClick={(e) => {
            startTest();
          }}
        >
          시작하기
        </Button>
      </div>
    </Container>
  );
};

export default Landing;

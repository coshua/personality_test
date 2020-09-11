import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 20vh;
  margin: 2rem;
`;

const Landing = ({ startTest, sound }) => {
  return (
    <Container>
      <div>당신의 내면에 귀 기울어보세요</div>
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

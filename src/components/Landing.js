import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "./Button";
import ReactAnime from "react-animejs";
import { spanGenerator } from "../utils/utilFunctions";
const { Anime, stagger } = ReactAnime;

const textFade = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
const Container = styled.div`
  text-align: center;
  span {
  }
`;

const Landing = ({ startTest, handleVideo }) => {
  return (
    <Container>
      <Anime
        initial={[
          {
            targets: "#animation .letter",
            opacity: [0, 1],
            easing: "easeInOutQuad",
            delay: stagger(100, { start: 3000 }),
          },
        ]}
      >
        <h1 id="animation">{spanGenerator("당신의 내면에 귀 기울어보세요")}</h1>
      </Anime>
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

import React, { useState, useRef, useEffect } from "react";
import questionnaire from "./utils/questionnaire";
import Landing from "./components/Landing";
import Question from "./components/Question";
import Result from "./components/Result";
import styled, { createGlobalStyle } from "styled-components";
import ReactHowler from "react-howler";
import Playlist from "./components/Playlist";
import img from "./img/flowers.jpg";
import rain from "./video/rain1920.mp4";
import star from "./video/star1280.mp4";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    font-family: "Noto Sans KR", sans-serif;
    height: 100%;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: fixed;
    transition: opacity 2s;
    opacity: ${(props) => props.opacity || "0"};
    z-index: -1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Span = styled.span`
  margin: 2rem auto;
  align-items: center;
`;

/* const fadeInOut = (init, end) => keyframes`
  0% {
    opacity: ${init}
  }
  
  100% {
    opacity: ${end}
  }
`; */

const QUESTIONS_LENGTH = questionnaire.length;

const initialState = {
  E: 0,
  I: 0,
  N: 0,
  S: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
};

const initialMusic = [
  {
    title: "memories",
    playing: false,
    volume: 0.5,
    src: Playlist[0],
    ref: null,
  },
  {
    title: "tomorrow",
    playing: false,
    volume: 0.5,
    src: Playlist[1],
    ref: null,
  },
  {
    title: "ukulele",
    playing: false,
    volume: 0.5,
    src: Playlist[2],
    ref: null,
  },
];

const videoList = {
  rain: {
    src: rain,
    opacity: 0.55,
  },
  star: {
    src: star,
    opacity: 1,
  },
};

const App = () => {
  const memoriesRef = useRef();
  const tomorrowRef = useRef();
  const ukuleleRef = useRef();

  // const RefArray = [memoriesRef, tomorrowRef, ukuleleRef];

  useEffect(() => {
    setMusic([
      { title: "memories", playing: false, src: Playlist[0], ref: memoriesRef },
      { title: "tomorrow", playing: false, src: Playlist[1], ref: tomorrowRef },
      { title: "ukulele", playing: false, src: Playlist[2], ref: ukuleleRef },
    ]);
    window.Kakao.init("77148d309b8680577a6ff34d93e29776");
    console.log(window.Kakao.isInitialized());
    window.Kakao.Link.createScrapButton({
      container: "#create-kakao-link-btn",
      requestUrl: "https://find-your-personality.netlify.app",
    });
  }, []);
  const [score, setScore] = useState(initialState);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [music, setMusic] = useState(initialMusic);
  const [video, setVideo] = useState(videoList.star);

  const MusicList = Playlist.map((audio, index) => {
    return (
      <ReactHowler
        key={index}
        src={audio.src}
        preload={true}
        loop={true}
        playing={music[index].playing}
        ref={music[index].ref}
        volume={music[index].volume}
      />
    );
  });

  const pauseMusic = () => {
    setMusic(music.map((music) => ({ ...music, playing: false })));
  };

  const stopMusic = (fade = 3000) => {
    let currentMusic = music.filter((music) => music.playing === true);
    if (currentMusic.length >= 1) {
      currentMusic[0].ref.current.howler.fade(0.5, 0, fade);
      setTimeout(() => currentMusic[0].ref.current.stop(), fade);
    }
  };

  const playMusic = (title = "memories", fade = 3000) => {
    stopMusic();
    let newMusic = music.map((music) =>
      music.title === title
        ? { ...music, playing: true }
        : { ...music, playing: false }
    );
    setMusic(newMusic);
    let currentMusic = music.filter((music) => music.title === title);
    if (currentMusic.length >= 1) {
      currentMusic[0].ref.current.howler.fade(0, 0.5, fade);
    }
  };

  const handleVideo = (title) => {
    setVideo({ ...video, opacity: "0" });
    setTimeout(() => setVideo(videoList[title]), 2000);
  };

  const startTest = () => {
    setScore(initialState);
    setIndex(0);
    setStart(true);
  };

  const refreshPage = () => {
    setScore(initialState);
    setIndex(0);
    setStart(false);
  };

  const handleAnswer = (type) => {
    setScore({
      ...score,
      [type]: score[type] + 1,
    });
    setIndex(index + 1);
  };

  const calcResult = () => {
    let str = "";
    str += score.E > score.I ? "E" : "I";
    str += score.N > score.S ? "N" : "S";
    str += score.T > score.F ? "T" : "F";
    str += score.J > score.P ? "J" : "P";
    return str;
  };

  return (
    <Container>
      <GlobalStyle url={img} opacity={video.opacity} />
      <video muted autoPlay loop preload="auto" src={video.src}>
        <source type="video/mp4" />
        <strong>Your browser does not support the video tag</strong>
      </video>
      <Content>
        {MusicList}
        {!start ? (
          <Landing startTest={startTest} handleVideo={handleVideo} />
        ) : index === QUESTIONS_LENGTH ? (
          <Result
            calcResult={calcResult}
            startTest={startTest}
            refreshPage={refreshPage}
          />
        ) : (
          <Question
            index={index}
            handleAnswer={handleAnswer}
            handleVideo={handleVideo}
          />
        )}
      </Content>
      <Span>
        <i
          className="fas fa-volume-mute fa-lg"
          onClick={(e) => pauseMusic()}
        ></i>
        <i
          className="fas fa-volume-mute fa-lg"
          onClick={(e) => stopMusic()}
        ></i>
        <i
          className="fas fa-headphones fa-lg"
          onClick={(e) => playMusic("ukulele")}
        ></i>
        <i
          className="fas fa-headphones fa-lg"
          onClick={(e) => playMusic("tomorrow")}
        ></i>
        <button
          onClick={(e) =>
            window.Kakao.Link.sendCustom({
              templateId: 36312,
              templateArgs: {
                image_url: img,
              },
            })
          }
        >
          Share
        </button>
        <button
          onClick={(e) =>
            window.Kakao.Link.sendScrap({
              requestUrl: "https://find-your-personality.netlify.app",
            })
          }
        >
          ShareScrap
        </button>
        <button id="create-kakao-link-btn">
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
            alt="share"
          />
        </button>
      </Span>
    </Container>
  );
};

export default App;

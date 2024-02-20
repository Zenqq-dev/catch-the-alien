import React, { useState } from "react";
import "./App.scss";
import Hint from "./components/UI/Hint/Hint";
import Game from "./components/Game";
import Results from "./components/UI/Results/Results";
import Start from "./components/Start";

function App() {
  const [start, setStart] = useState<boolean>(true);
  const [wasShowedHint, setWasShowedHint] = useState(false);
  const [time, setTime] = useState(30);
  const [showGame, setShowGame] = useState(true);
  const [aliensCounter, setAliensCounter] = useState<number>(0);
  const timeHandler = () => {
    const timeId = setInterval(() => {
      setTime((prev) => {
        const newTime = prev - 0.5;
        if (newTime <= 0) {
          clearInterval(timeId);
          setTimeout(setShowGame, 2020);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };
  const handleClick = (evil: boolean) => {
    if (evil) {
      setAliensCounter((prev) => Math.min(prev + 1, 10));
    } else if (!evil) {
      setAliensCounter((prev) => Math.max(0, prev - 1));
    }
  };
  const appClass = () => {
    if (start) {
      return "dark";
    } else if (showGame && !start && time <= 0) {
      return "end";
    } else if (!showGame && !start && wasShowedHint) return "results";
    return "";
  };
  const resetGame = () => {
    setShowGame(true);
    setTime(30);
    setAliensCounter(0);
    console.log(showGame, time, aliensCounter);
  };
  return (
    <div className={`app ${appClass()}`}>
      {start ? (
        <Start
          start={start}
          setStart={setStart}
        />
      ) : !wasShowedHint ? (
        <Hint
          wasShowedHint={wasShowedHint}
          setWasShowedHint={setWasShowedHint}
        />
      ) : showGame ? (
        <Game
          aliensCounter={aliensCounter}
          handleClick={handleClick}
          time={time}
          timeHandler={timeHandler}
        />
      ) : (
        <Results
          resetHandler={resetGame}
          counter={aliensCounter}
        />
      )}
    </div>
  );
}

export default App;

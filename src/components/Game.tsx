import React, { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import Counter from "./Counter";
import Man from "./UI/Man/Man";
import AlienGenerator from "./AlienGenerator";

type Props = {
  time: number;
  timeHandler: () => void;
  aliensCounter: number;
  handleClick: (x: boolean) => void;
};

export default function Game({ time, timeHandler, aliensCounter, handleClick }: Props) {
  const [handleEndVisible, setHandleEndVisible] = useState(true);
  const gameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (time <= 0 && handleEndVisible) {
      const timerId = setTimeout(() => {
        setHandleEndVisible(false);
      }, 2000);

      return () => clearTimeout(timerId);
    }
  }, [time, handleEndVisible]);
  useEffect(() => {
    timeHandler();
  }, []);

  return (
    <div
      className='game'
      ref={gameRef}>
      {time > 0 ? (
        <>
          <div className='game__header'>
            <Counter counter={aliensCounter} />
            <Timer time={time} />
          </div>
          <div className='game__area'></div>
          <div className='game__people'>
            <Man
              x={-0}
              y={100}
              variant={1}
              gameRef={gameRef}
            />

            <Man
              x={20}
              y={-30}
              variant={2}
              gameRef={gameRef}
            />

            <Man
              x={-50}
              y={0}
              variant={3}
              gameRef={gameRef}
            />
          </div>
          <div className='game__alien'>
            <AlienGenerator
              gameRef={gameRef}
              clickOnAlien={handleClick}
            />
          </div>
        </>
      ) : handleEndVisible ? (
        <>
          <div className='game__header'>
            <Counter counter={aliensCounter} />
            <Timer time={time} />
          </div>
          <div className='game__end'>
            <div className='game__title'>Конец</div>
            <div className='game__subtitle'>Пора узнать результат...</div>
          </div>
        </>
      ) : null}
    </div>
  );
}

import React from "react";
import Alien from "./Alien";
import Button from "./UI/Button/Button";

type Props = {
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Start({ start, setStart }: Props) {
  return (
    <div className='start '>
      <div className='start__img'></div>
      <div className='start__content'>
        <div className='start__alien'></div>
        <div className='start__title'>
          <div className='start__title_alien'>
            <Alien
              start={start}
              alien='green'
              bubbled
              preview
            />
          </div>
          <div className='start__title_text'>ПОЙМАЙ ПРИШЕЛЬЦА!</div>
        </div>
        <div className='start__button'>
          <Button onClick={() => setStart(!start)}>Начать</Button>
        </div>
      </div>
    </div>
  );
}

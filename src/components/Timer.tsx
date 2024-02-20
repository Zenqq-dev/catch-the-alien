import React, { CSSProperties } from "react";
import Clock from "../assets/images/clock.svg";
type Props = {
  time: number;
};

export default function Counter({ time }: Props) {
  const timerStyles: CSSProperties = {
    border: "4px solid #F14338",
    color: "#F14338",
  };
  return (
    <div
      className='timer'
      style={time < 10 ? timerStyles : undefined}>
      <div className='timer__img'>
        <img
          src={Clock}
          alt=''
        />
      </div>
      <div className='timer__count'>
        {time % 60 > 9 ? `${Math.floor(time / 60)}:${time % 60}` : `${Math.floor(time / 60)}:0${time % 60}`}
      </div>
    </div>
  );
}

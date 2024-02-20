import React from "react";
import "../styles/index.scss";
import Alien from "../assets/images/shipGreen_manned.png";
type Props = {
  counter?: number;
};

export default function Counter({ counter }: Props) {
  return (
    <div
      className='counter'
      style={{ zIndex: "5" }}>
      <div className='counter__img'>
        <img
          src={Alien}
          alt=''
        />
      </div>
      <div className='counter__count'>{counter}/10</div>
    </div>
  );
}

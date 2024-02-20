import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./man.module.scss";

type Props = {
  variant: number;
  x: number;
  y: number;
  gameRef?: React.RefObject<HTMLDivElement>;
};

const Man: React.FC<Props> = ({ variant, gameRef, x, y }) => {
  const [isRunning, setIsRunnig] = useState(true);
  const [rightDirection, setRightDirection] = useState(true);
  const [position, setPosition] = useState({
    left: x,
    bottom: y,
  });
  const runningStyles: CSSProperties = {
    transform: `${rightDirection ? "scale(-1,1)" : "scale(1)"}`,
    left: position.left,
    bottom: position.bottom,
  };
  useEffect(() => {
    let animationInterval: NodeJS.Timeout;
    console.log(gameRef?.current?.offsetWidth);

    const RunningPeople = () => {
      if (isRunning) {
        if (rightDirection) {
          setPosition((prev) => ({ ...prev, left: prev.left + 5 }));
        }
        if (!rightDirection) {
          setPosition((prev) => ({ ...prev, left: prev.left - 5 }));
        }
        if (gameRef?.current && position.left - 20 > gameRef?.current?.offsetWidth) {
          setRightDirection(false);
          setPosition((prev) => ({
            ...prev,
            bottom: Math.floor(Math.random() * ((gameRef?.current?.offsetHeight || 0) * 0.16)),
          }));
        }
        if (gameRef?.current && position.left < -40) {
          setRightDirection(true);
          setPosition((prev) => ({
            ...prev,
            bottom: Math.floor(Math.random() * ((gameRef?.current?.offsetHeight || 0) * 0.16)),
          }));
        }
      }
    };
    animationInterval = setInterval(RunningPeople, 50);
    return () => {
      clearInterval(animationInterval);
    };
  }, [position.left, rightDirection, gameRef?.current?.offsetWidth]);
  return (
    <div
      className={classes.man}
      style={runningStyles}>
      <img
        style={runningStyles}
        src={`/images/men${variant}.png`}
        alt=''
      />
    </div>
  );
};

export default Man;

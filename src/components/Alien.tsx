import React, { useEffect, useState } from "react";
import "../styles/index.scss";
type Props = {
  bubbled: boolean;
  start?: boolean;
  alien: string;
  blocked?: boolean;
  phrase?: string;
  game?: boolean;
  preview?: boolean;
  handleClick?: (x: boolean) => void;
  onDemount?: () => void;
  evil?: boolean;
  gameRef?: React.RefObject<HTMLDivElement>;
};

export default function Alien({
  alien,
  bubbled,
  start,
  preview,
  phrase,
  game,
  onDemount,
  handleClick,
  evil,
  blocked,
  gameRef,
}: Props) {
  const [fall, setFall] = useState(true);
  const [up, setUp] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState({
    top: -50,
    left: Math.floor(Math.random() * (gameRef?.current?.offsetWidth ?? 0) * 0.73 + 1),
  });
  const [isBubbled, setIsBubbled] = useState(bubbled || false);
  const [mount, setMount] = useState(true);
  const alienImg =
    bubbled || isBubbled
      ? blocked
        ? "/images/bannedBubble.svg"
        : "/images/bubble.svg"
      : `/images/ship${alien}_manned.png`;

  useEffect(() => {
    let animationInterval: NodeJS.Timeout;

    const fallAnimation = () => {
      if (game) {
        if (fall) {
          setPosition((prevPosition) => ({
            ...prevPosition,
            top: prevPosition.top + 3,
          }));

          if (position.top >= window.innerHeight * 0.45 || isBubbled) {
            stopFalling();
          }
        } else if (up) {
          setPosition((prevPosition) => ({
            ...prevPosition,
            top: prevPosition.top - 16,
          }));

          if (position.top < -200) {
            setMount(false);
            clearInterval(animationInterval);
          }
        }
      }
    };

    if (game) {
      animationInterval = setInterval(fallAnimation, 50);
    }

    return () => clearInterval(animationInterval);
  }, [fall, up, position.top, game]);
  const stopFalling = () => {
    setFall(false);
    setUp(true);
    if (evil !== undefined && evil === true && handleClick && !isBubbled) {
      handleClick(false);
    }
  };
  const checkPhrase = () => {
    if (phrase) {
      if (phrase?.split(" ").length > 3 || phrase.length > 13) {
        return "big";
      } else {
        return "small";
      }
    }
  };
  const bubbleStyles: React.CSSProperties = {
    position: `${isBubbled && !preview ? "absolute" : "static"}`,
    backgroundImage: "url(" + `/images/ship${alien}_manned.png` + ")",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    animation: start ? "bounce 1s infinite alternate" : "none",
  };
  const fallStyles: React.CSSProperties = {
    position: `${preview ? "static" : "absolute"}`,
    top: `${position.top}px`,
    left: `${position.left}px`,
    backgroundImage: `${up ? "url(" + `/images/ship${alien}_manned.png` + ")" : "none"}`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const clickFunction = () => {
    if (evil !== undefined && handleClick && !isBubbled) {
      handleClick(evil);
    }
    setIsBubbled(true);
    setClicked(true);
  };
  const handleDemount = () => {
    if (onDemount) {
      onDemount();
      return null;
    }
  };
  useEffect(() => {
    if (!mount) {
      handleDemount();
    }
  }, [mount, position.top]);

  return (
    <div
      className={isBubbled ? "alien alien__bubbled" : "alien"}
      style={preview && bubbled ? bubbleStyles : fallStyles}
      onClick={!preview && !clicked ? clickFunction : undefined}>
      <img
        src={alienImg}
        alt=''
        style={isBubbled ? { mixBlendMode: "plus-lighter", opacity: 1, zIndex: "2", position: "relative" } : undefined}
      />
      {phrase ? (
        <div className='alien__text'>
          <div
            className='alien__img'
            style={{ right: `${position.left > 168 ? "143" : "0"}px` }}>
            <img
              style={{ transform: `${position.left > 168 ? "scale(-1, 1)" : ""}` }}
              src={`/images/${checkPhrase()}BubbleLeft.png`}
              alt=''
            />
          </div>

          <div
            className={
              checkPhrase() === "big" ? "alien__phrase alien__phrase_big" : "alien__phrase alien__phrase_small"
            }
            style={{ left: `${position.left > 168 ? "-135" : ""}px` }}>
            {phrase}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

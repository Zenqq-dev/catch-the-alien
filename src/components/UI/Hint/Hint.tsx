import React, { useEffect, useState } from "react";
import classes from "./hint.module.scss";
import Alien from "../../Alien";
import Button from "../Button/Button";
type Props = {
  wasShowedHint: boolean;
  setWasShowedHint: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Hint({ wasShowedHint, setWasShowedHint }: Props) {
  const [alien, setAlien] = useState("Green");
  const [text, setText] = useState("Нажимай на НЛО и отправляй их в далекий космос!");
  const [buttonText, setButtonText] = useState("Ясно");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMovingUp, setIsMovingUp] = useState(true);
  const [isBubbled, setIsBubbled] = useState(false);
  const changeHint = () => {
    if (buttonText === "Погнали") {
      setWasShowedHint(true);
    }
    setAlien("Yellow");
    setIsBlocked(true);
    setButtonText("Погнали");
    setText("но не все ИНОПЛАНЕТЯНЕ ЗЛЫЕ. кто-то ПРОСТО УСТАЛ ИЛИ ЗАБОЛЕЛ. ДАЙ ИМ ПРОСТО УЛЕТЕТЬ И ВСЁ БУДЕТ ХОРОШО!");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsMovingUp((prev) => !prev);
      setIsBubbled((prev) => !prev);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.hint}>
      <div className={classes.hint__img}>
        <div className={classes.hint__alien}>
          <Alien
            alien={alien}
            bubbled={isBubbled}
            blocked={isBlocked}
            preview
          />
          <div className={classes.hint__click}>
            <img
              src={isMovingUp ? "/images/hand.svg" : "/images/click.svg"}
              alt=''
              style={{
                animation: isMovingUp ? "moveUpDown 2.3s infinite" : "",
              }}
            />
          </div>
        </div>
      </div>
      <div className={classes.hint__text}>{text}</div>
      <div className=''>
        <Button onClick={changeHint}>{buttonText}</Button>
      </div>
    </div>
  );
}

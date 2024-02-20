import React from "react";
import classes from "./results.module.scss";
import Button from "../Button/Button";
import { TelegramShareButton, VKShareButton, OKShareButton } from "react-share";

type Props = {
  counter: number;
  resetHandler: () => void;
};

export default function Results({ counter, resetHandler }: Props) {
  const resultsText = [
    "Теперь понятно, почему тебя не зовут спасать мир. Попробуешь ещё раз?",
    "Ты, конечно, не супергерой, но своё дело знаешь. Город ещё не спасен. Попробуешь ещё раз?",
    "Лучший из лучших. Настоящий спаситель человечества.",
  ];
  const starCounter = () => {
    if (counter <= 4) {
      return 0;
    } else if (counter > 4 && counter <= 8) {
      return 1;
    } else if (counter > 8) {
      return 2;
    } else return 1;
  };

  const starArray = new Array(starCounter() + 1).fill("star");

  return (
    <div className={classes.results}>
      <div className={classes.results__stars}>
        {starArray.map((i, k) => {
          return (
            <img
              key={k}
              src={`/images/${i}.png`}
              alt='stars'
            />
          );
        })}
      </div>
      <div className={classes.results__title}>Поймано {`${counter}/10`}!</div>
      <div className={classes.results__subtitle}>{resultsText[starCounter()]}</div>
      <div className={classes.results__btn}>
        <Button onClick={() => resetHandler()}>Еще раз!</Button>
      </div>

      <div className='share'>
        <div className={classes.results__text}>Поделиться</div>
        <div className={classes.results__icons}>
          <TelegramShareButton
            url={"github.com"}
            title={resultsText[starCounter()]}>
            <img
              src='/images/telegram.png'
              alt=''
            />
          </TelegramShareButton>

          <OKShareButton
            url={"github.com"}
            title={resultsText[starCounter()]}>
            <img
              src='/images/odnoklassniki.png'
              alt=''
            />
          </OKShareButton>

          <VKShareButton
            url={"github.com"}
            title={resultsText[starCounter()]}>
            <img
              src='/images/vk.png'
              alt=''
            />
          </VKShareButton>
        </div>
      </div>
    </div>
  );
}

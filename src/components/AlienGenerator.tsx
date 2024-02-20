import React, { ReactNode, useEffect, useState } from "react";
import Alien from "./Alien";

type AlienInfo = {
  id: number;
  component: ReactNode;
};

type Props = {
  clickOnAlien: (x: boolean) => void;
  gameRef: React.RefObject<HTMLDivElement>;
};

export default function AlienGenerator({ clickOnAlien, gameRef }: Props) {
  const evilPhrases = [
    "я пришел с миром!! или нет...",
    "я захвачу пиццу!",
    "АААААААААААА!!!!",
    "За плутон!!",
    "Украду гараж!",
  ];
  const goodPhrases = [
    "Хочу домой...",
    "Говорила мне мама далеко не улетать",
    "Куда я лечу? Зачем? для чего?",
    "У вас есть макароны по скидке?",
    "На последний автобус не успеваю...",
  ];

  const aliensColor = ["Beige", "Blue", "Green", "Pink", "Yellow"];
  const [spawnedAliens, setSpawnedAliens] = useState<AlienInfo[]>([]);

  const spawnAlien = () => {
    const alienId = Date.now();
    const isEvil = Math.random() < 0.7;
    const phrases = isEvil ? evilPhrases : goodPhrases;
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const randomColor = aliensColor[Math.floor(Math.random() * aliensColor.length)];
    const handleAlienDemount = () => {
      setSpawnedAliens((prev: AlienInfo[]) => {
        return prev.filter((alien) => alien.id !== alienId);
      });
    };

    const alienComponent = (
      <Alien
        key={alienId}
        bubbled={false}
        alien={randomColor}
        phrase={randomPhrase}
        game
        onDemount={handleAlienDemount}
        blocked={isEvil ? false : true}
        handleClick={clickOnAlien}
        evil={isEvil}
        gameRef={gameRef}
      />
    );

    return { id: alienId, component: alienComponent };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomNumb = () => {
        return Math.max(Math.floor(Math.random() * 3 + 1), 2);
      };
      setSpawnedAliens((prev: AlienInfo[]) => {
        if (prev.length < randomNumb()) {
          return [...prev, spawnAlien()];
        }
        return prev;
      });
    }, Math.floor(Math.random() * 1000 + 300));

    return () => {
      clearInterval(intervalId);
    };
  }, [spawnedAliens]);

  return <>{spawnedAliens.map((alien) => alien.component)}</>;
}

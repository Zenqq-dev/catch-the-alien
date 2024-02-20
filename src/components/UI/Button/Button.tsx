import React from "react";
import classes from "./button.module.scss";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={classes.btn}>
      {children}
    </button>
  );
}

import React from "react";
import { LetterResult } from "services/wordle";

interface Props {
  letter_results: {
    [x: string]: LetterResult;
  };
}

export function Keyboard({ letter_results }: Props) {
  const letter_boxes = Object.keys(letter_results).map((key: string) => {
    let value = letter_results[key];
    return <div>{key}: {value}</div>
  });
  return (
    <>
      {letter_boxes}
    </>
  );
}

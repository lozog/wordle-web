import React from "react";
import { LetterResult } from "services/wordle";
import * as S from "./styles";

interface Props {
  letterResults: {
    [x: string]: LetterResult;
  };
}

export function Keyboard({ letterResults }: Props) {
  const letter_boxes = Object.keys(letterResults).map((key: string) => {
    let value = letterResults[key];
    return <div>{key}: {value}</div>
  });
  return (
    <S.Container>
      {letter_boxes}
    </S.Container>
  );
}

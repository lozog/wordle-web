import React from "react";
import { LetterResult, WORD_LENGTH } from "services/wordle";
import * as S from "./styles";

interface Props {
  wordToRender: string;
  word: string;
  isLockedIn: boolean;
}

export function Guess({ wordToRender, word, isLockedIn }: Props) {
  const renderTiles = () => {
    return [...Array(WORD_LENGTH).keys()].map(i => (
      <S.Letter
        key={i}
        letterToRender={wordToRender.split("")[i] ?? ""}
        letterResult={LetterResult.UNUSED}
        isLockedIn={isLockedIn}
      >
        {wordToRender.split("")[i]}
      </S.Letter>
    ))
  }
  return (
    <S.Container wordLength={WORD_LENGTH}>{renderTiles()}</S.Container>
  );
}
